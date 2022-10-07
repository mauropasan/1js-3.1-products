const Store = require('../store.class');
const View = require('../view/view.class');

class Controller {

    constructor() {
        this.store = new Store(1, 'Almacén ACME'),
        this.view = new View
    }

    init() {
        this.store.init();
        this.store.products.forEach(prod => {
            this.renderButtons(prod);
        });
        this.store.categories.forEach(cat => {
            this.view.renderCategory(cat);
        });
        this.view.renderTotalImport(this.store);
    }

    addProductToStore(payload) {
        try {
            const prod = this.store.addProduct(payload);
            this.renderButtons(prod);
            this.view.renderTotalImport(this.store);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }
    
    deleteProductFromStore(id) {
        try {
            const prod = this.store.delProduct(parseInt(id));
            this.view.deleteProductRender(prod);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }

    addCategoryToStore(payload) {
        try {
            const cat = this.store.addCategory(payload.name, payload.description);
            this.view.renderCategory(cat);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }

    deleteCategoryFromStore(id) {
        try {
            const cat = this.store.delCategory(parseInt(id));
            this.view.deleteCategoryRender(cat);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }

    renderButtons(prod) {
        let prodRender = this.view.renderProduct(prod);
        this.addDelButtonListener(prod, prodRender);
        this.addRaiseButtonListener(prod, prodRender);
        this.addLowerButtonListener(prod, prodRender);
    }

    addDelButtonListener(prod, prodRender) {
        const delButton = prodRender.lastElementChild.firstElementChild;
        delButton.addEventListener("click", () => {
            this.deleteProductFromStore(prod.id);
        });
    }

    addRaiseButtonListener(prod, prodRender) {
        const raiseButton = prodRender.lastElementChild.firstElementChild.nextElementSibling;
        raiseButton.addEventListener("click", () => {
            prod.units++;
            prodRender = this.view.renderPaintedProduct(prod);
        });
    }

    addLowerButtonListener(prod, prodRender) {
        const lowerButton = prodRender.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling;
        lowerButton.addEventListener("click", () => {
            prod.units--;
            prodRender = this.view.renderPaintedProduct(prod);
        });
    }
}

module.exports = Controller;
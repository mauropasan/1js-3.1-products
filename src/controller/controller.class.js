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
            this.view.renderProduct(prod);
        });
        this.store.categories.forEach(cat => {
            this.view.renderCategory(cat);
        });
        this.view.renderTotalImport(this.store);
    }

    addProductToStore(payload) {
        try {
            const prod = this.store.addProduct(payload);
            this.view.renderProduct(prod);
            this.view.renderTotalImport(this.store);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }
    
    deleteProductFromStore(id) {
        try {
            const prod = this.store.delProduct(parseInt(id));
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
        } catch(err) {
            this.view.renderMessage(err);
        }
    }
}

module.exports = Controller;
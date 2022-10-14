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

    editProductFromStore(payload) {
        try {
            const id = payload.id;
            const name = payload.name;
            const price = payload.price;
            const category = payload.category;
            const units = payload.units;
            const newProd = this.store.modProd({id, name, price, category, units});
            this.view.renderPaintedProduct(newProd);
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
        try {
            this.addLowerButtonListener(prod, prodRender);
        } catch(err) {
            this.view.renderMessage(err);
        }
        this.addEditButtonListener(prod, prodRender);
    }

    addDelButtonListener(prod, prodRender) {
        const delButton = prodRender.querySelector(".del-prod");
        delButton.addEventListener("click", () => {
            this.deleteProductFromStore(prod.id);
        });
    }

    addRaiseButtonListener(prod, prodRender) {
        const raiseButton = prodRender.querySelector(".raise-units");
        const lowerButton = prodRender.querySelector(".lower-units");
        raiseButton.addEventListener("click", () => {
            if(prod.units === 0) {
                lowerButton.removeAttribute('disabled');
            }
            prod.units++;
            prodRender = this.view.renderPaintedProduct(prod);
            this.view.renderTotalImport(this.store);
        });
    }

    addLowerButtonListener(prod, prodRender) {
        const lowerButton = prodRender.querySelector(".lower-units");
        lowerButton.addEventListener("click", () => {
            if(prod.units === 0) {
                throw `No es pot baixar més de 0 unitats`;
            } else {
                prod.units--;
                if(prod.units === 0) {
                    lowerButton.setAttribute('disabled', '');
                }
            }
            prodRender = this.view.renderPaintedProduct(prod);
            this.view.renderTotalImport(this.store);
        });
    }

    addEditButtonListener(prod, prodRender) {
        const editButton = prodRender.querySelector(".edit");
        editButton.addEventListener("click", () => {
            const form = document.querySelector("#new-prod");
            form.querySelector(".title").innerHTML = "Modificar producto" ;
            form.querySelector(".submit").innerHTML = "Modificar";
            const id = document.getElementById('newprod-id');
            const name = document.getElementById('newprod-name');
            const category = document.getElementById('newprod-cat');
            const price = document.getElementById('newprod-price');
            const units = document.getElementById('newprod-units');
            id.value = `${prod.id}`;
            name.value = `${prod.name}`;
            category.value = `${prod.category}`;
            price.value = `${prod.price}`;
            units.value = `${prod.units}`;
        });
        const form = document.querySelector("#new-prod");
        const resetButton = form.querySelector(".reset");
        resetButton.addEventListener("click", () => {
            document.querySelector(".title").innerHTML = "Añadir producto";
            document.querySelector(".submit").innerHTML = "Añadir";
        })
    }
}

module.exports = Controller;
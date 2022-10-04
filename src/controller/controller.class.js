const Store = require('../store.class');
const View = require('../view/view.class');

class Controller {

    constructor() {
        this.store = new Store(1, 'Almacén ACME'),
        this.view = new View
    }

    init() {
        this.store.init();
    }

    addProductToStore(payload) {
        try {
            const prod = this.store.addProduct(payload);
            this.view.renderProduct(payload);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }
    
    deleteProductFromStore(id) {
        try {
            const prod = this.store.delProduct(id);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }

    addCategoryToStore(payload) {
        try {
            const cat = this.store.addCategory(payload);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }

    deleteCategoryFromStore(id) {
        try {
            const cat = this.store.delCategory(id);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }
}

module.exports = Controller;
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
            this.view.renderCategoryOption(cat);
            this.renderCatButtons(cat);
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
            const id = parseInt(payload.id);
            const name = payload.name;
            const price = payload.price;
            const category = payload.category;
            const units = payload.units;
            const newProd = this.store.modProd({id, name, price, category, units});
            this.view.renderPaintedProduct(newProd);
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
            this.view.renderCategoryOption(cat);
            this.renderCatButtons(cat);
        } catch(err) {
            this.view.renderMessage(err);
        }
    }

    editCategoryFromStore(payload) {
        try {
            const id = parseInt(payload.id);
            const name = payload.name;
            const description = payload.description;
            const newCat = this.store.modCat({id, name, description});
            this.view.renderPaintedCategory(newCat);
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
        this.addDelProdButtonListener(prod, prodRender);
        this.addRaiseUnitsButtonListener(prod, prodRender);
        try {
            this.addLowerUnitsButtonListener(prod, prodRender);
        } catch(err) {
            this.view.renderMessage(err);
        }
        this.addEditProdButtonListener(prod, prodRender);
    }

    addDelProdButtonListener(prod, prodRender) {
        const delButton = prodRender.querySelector('.del-prod');
        delButton.addEventListener("click", () => {
            this.deleteProductFromStore(prod.id);
        });
    }

    addRaiseUnitsButtonListener(prod, prodRender) {
        const raiseButton = prodRender.querySelector('.raise-units');
        const lowerButton = prodRender.querySelector('.lower-units');
        raiseButton.addEventListener("click", () => {
            if(prod.units >= 0) {
                lowerButton.removeAttribute('disabled');
            }
            prod.units++;
            prodRender = this.view.renderPaintedProduct(prod);
            this.view.renderTotalImport(this.store);
        });
    }

    addLowerUnitsButtonListener(prod, prodRender) {
        const lowerButton = prodRender.querySelector(".lower-units");
        lowerButton.addEventListener('click', () => {
            if(prod.units === 0) {
                throw `No se puede bajar menos de 0 unidades`;
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

    addEditProdButtonListener(prod, prodRender) {
        const editButton = prodRender.querySelector('.edit');
        editButton.addEventListener('click', (event) => {
            this.showProductForm(event);

            const form = document.querySelector('#new-prod');
            form.querySelector('.title').innerHTML = "Modificar producto";
            form.querySelector('.submit').innerHTML = "Modificar";
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
        const form = document.querySelector('#new-prod');
        const resetButton = form.querySelector('.reset');
        resetButton.addEventListener('click', () => {
            document.querySelector('.title').innerHTML = "Añadir producto";
            document.querySelector('.submit').innerHTML = "Añadir";
        })
    }

    renderCatButtons(cat) {
        let catRender = this.view.renderCategory(cat);
        this.addDelCatButtonListener(cat, catRender);
        this.addEditCatButtonListener(cat, catRender);
    }

    addDelCatButtonListener(cat, catRender) {
        const delButton = catRender.querySelector('.del-cat');
        delButton.addEventListener('click', () => {
            this.deleteCategoryFromStore(parseInt(cat.id));
        });
    }

    addEditCatButtonListener(cat, catRender) {
        const editButton = catRender.querySelector('.edit-cat');
        editButton.addEventListener('click', (event) => {
            this.showCategoryForm(event);
            const id = document.getElementById('newcat-id');
            const name = document.getElementById('newcat-name');
            const description = document.getElementById('newcat-description');
            id.value = `${cat.id}`;
            name.value = `${cat.name}`;
            description.value = `${cat.description}`;
        })
    }

    showProducts(event) {
        event.preventDefault();
        document.querySelector("div h1").innerHTML = "Listado de productos";
        document.getElementById("new-cat").className = "new-cat";
        document.getElementById("new-prod").className = "new-prod";
        document.getElementById("almacen").className = "almacen-show";
        document.getElementById("category-list").className = "category-list";
        document.getElementById('about-us').className = "about-us";
    }

    showCategories(event) {
        event.preventDefault();
        document.querySelector("div h1").innerHTML = "Listado de categorías";
        document.getElementById("new-cat").className = "new-cat";
        document.getElementById("new-prod").className = "new-prod";
        document.getElementById("almacen").className = "almacen";
        document.getElementById("category-list").className = "category-list-show";
        document.getElementById('about-us').className = "about-us";
    }

    showProductForm(event) {
        event.preventDefault();
        document.querySelector("div h1").innerHTML = "Añadir un producto nuevo";
        document.getElementById("almacen").className = "almacen";
        document.getElementById("new-cat").className = "new-cat";
        document.getElementById("new-prod").className = "new-prod-show";
        document.getElementById("category-list").className = "category-list";
        document.getElementById('about-us').className = "about-us";
    }

    showCategoryForm(event) {
        event.preventDefault();
        document.querySelector("div h1").innerHTML = "Añadir una categoría nueva";
        document.getElementById("almacen").className = "almacen";
        document.getElementById("new-prod").className = "new-prod";
        document.getElementById("new-cat").className = "new-prod-show";
        document.getElementById("category-list").className = "category-list";
        document.getElementById('about-us').className = "about-us";
    }

    showAboutUs(event) {
        event.preventDefault();
        document.querySelector("div h1").innerHTML = "Sobre nosotros";
        document.getElementById("almacen").className = "almacen";
        document.getElementById("new-prod").className = "new-prod";
        document.getElementById("new-cat").className = "new-prod";
        document.getElementById("category-list").className = "category-list";
        document.getElementById('about-us').className = "about-us-show";
    }
}

module.exports = Controller;
const Product = require('../product.class')
const Store = require('../store.class')
const View = require('../view/view.class')

class Controller {

    constructor() {
        this.store = new Store(1, 'Almacén ACME'),
            this.view = new View
    }

    init() {
        this.store.init()
            .then(() => {
                this.store.products.forEach(prod => {
                    this.renderButtons(prod)
                })
                this.store.categories.forEach(cat => {
                    this.view.renderCategoryOption(cat)
                    this.renderCatButtons(cat)
                })
                this.view.renderTotalImport(this.store)
            })
            .catch(error => console.log(error))
    }

    checkProductValidity() {
        if (this.store.hasSameProductName(document.getElementById('newprod-id').value, document.getElementById('newprod-name').value)) {
            document.getElementById('newprod-name').setCustomValidity("No pueden haber dos productos con el mismo nombre")
            document.getElementById('newprod-name').nextElementSibling.innerHTML = document.getElementById('newprod-name').validationMessage
            return false
        } else {
            document.getElementById('newprod-name').setCustomValidity("")
            document.getElementById('newprod-name').nextElementSibling.innerHTML = document.getElementById('newprod-name').validationMessage
        }
        const inputs = ['newprod-name', 'newprod-cat', 'newprod-units', 'newprod-price']
        inputs.forEach((inputId) => {
            document.getElementById(inputId).nextElementSibling.innerHTML = document.getElementById(inputId).validationMessage
        })
        return document.getElementById('new-prod').checkValidity()
    }

    addProductToStore(payload) {
        try {
            const prod = this.store.addProduct(payload)
            this.renderButtons(prod)
            this.view.renderTotalImport(this.store)
        } catch (err) {
            this.view.renderMessage(err)
        }
    }

    async editProductFromStore(payload) {
        try {
            const newProd = await this.store.modProd(payload)
            this.view.renderPaintedProduct(newProd)
        } catch (err) {
            this.view.renderMessage(err)
        }
    }

    async deleteProductFromStore(id) {
        try {
            const prod = await this.store.delProduct(parseInt(id))
            this.view.deleteProductRender(prod)
        } catch(err) {
            this.view.renderMessage(err)
        }
        
        
    }

    addCategoryToStore(payload) {
        try {
            const cat = this.store.addCategory(payload.name, payload.description)
            this.view.renderCategoryOption(cat)
            this.renderCatButtons(cat)
        } catch(err) {
            this.view.renderMessage(err)
        }
        
    }

    editCategoryFromStore(payload) {
        const id = parseInt(payload.id)
        const name = payload.name
        const description = payload.description
        const newCat = this.store.modCat({ id, name, description })
            .then(this.view.renderPaintedCategory(newCat))
            .catch(this.view.renderMessage(err))
    }

    deleteCategoryFromStore(id) {
        const cat = this.store.delCategory(parseInt(id))
            .then(this.view.deleteCategoryRender(cat))
            .catch(this.view.renderMessage(err))
    }

    renderButtons(prod) {
        let prodRender = this.view.renderProduct(prod)
        this.addDelProdButtonListener(prod, prodRender)
        this.addRaiseUnitsButtonListener(prod, prodRender)
        try {
            this.addLowerUnitsButtonListener(prod, prodRender)
        } catch (err) {
            this.view.renderMessage(err)
        }
        this.addEditProdButtonListener(prod, prodRender)
    }

    addDelProdButtonListener(prod, prodRender) {
        const delButton = prodRender.querySelector('.del-prod')
        delButton.addEventListener("click", () => {
            this.deleteProductFromStore(prod.id)
        })
    }

    addRaiseUnitsButtonListener(prod, prodRender) {
        const raiseButton = prodRender.querySelector('.raise-units')
        const lowerButton = prodRender.querySelector('.lower-units')
        raiseButton.addEventListener("click", () => {
            if (prod.units >= 0) {
                lowerButton.removeAttribute('disabled')
            }
            prod.units++
            this.editProductFromStore(prod)
        })
    }

    addLowerUnitsButtonListener(prod, prodRender) {
        const lowerButton = prodRender.querySelector(".lower-units")
        lowerButton.addEventListener('click', () => {
            if (prod.units === 0) {
                this.view.renderMessage(`No se puede bajar menos de 0 unidades`)
            } else {
                prod.units--
                this.editProductFromStore(prod)
                if (prod.units === 0) {
                    lowerButton.setAttribute('disabled', '')
                }
            }
        })
    }

    addEditProdButtonListener(prod, prodRender) {
        const editButton = prodRender.querySelector('.edit')
        editButton.addEventListener('click', (event) => {
            this.showProductForm(event)

            const form = document.querySelector('#new-prod')
            form.querySelector('.title').innerHTML = "Modificar producto"
            form.querySelector('.submit').innerHTML = "Modificar"
            document.getElementById('newprod-id').value = `${prod.id}`
            document.getElementById('newprod-name').value = `${prod.name}`
            document.getElementById('newprod-cat').value = `${prod.category}`
            document.getElementById('newprod-price').value = `${prod.price}`
            document.getElementById('newprod-units').value = `${prod.units}`
        })
        const form = document.querySelector('#new-prod')
        const resetButton = form.querySelector('.reset')
        resetButton.addEventListener('click', () => {
            document.querySelector('.title').innerHTML = "Añadir producto"
            document.querySelector('.submit').innerHTML = "Añadir"
        })
    }

    renderCatButtons(cat) {
        let catRender = this.view.renderCategory(cat)
        this.addDelCatButtonListener(cat, catRender)
        this.addEditCatButtonListener(cat, catRender)
    }

    addDelCatButtonListener(cat, catRender) {
        const delButton = catRender.querySelector('.del-cat')
        delButton.addEventListener('click', () => {
            this.deleteCategoryFromStore(parseInt(cat.id))
        })
    }

    addEditCatButtonListener(cat, catRender) {
        const editButton = catRender.querySelector('.edit-cat')
        editButton.addEventListener('click', (event) => {
            this.showCategoryForm(event)
            const id = document.getElementById('newcat-id')
            const name = document.getElementById('newcat-name')
            const description = document.getElementById('newcat-description')
            id.value = `${cat.id}`
            name.value = `${cat.name}`
            description.value = `${cat.description}`
        })
    }

    showProducts() {
        document.querySelector("div h1").innerHTML = "Listado de productos"
        document.getElementById("new-cat").className = "hide"
        document.getElementById("new-prod").className = "hide"
        document.getElementById("almacen").className = "show"
        document.getElementById("category-list").className = "hide"
        document.getElementById('about-us').className = "hide"
    }

    showCategories() {
        document.querySelector("div h1").innerHTML = "Listado de categorías"
        document.getElementById("new-cat").className = "hide"
        document.getElementById("new-prod").className = "hide"
        document.getElementById("almacen").className = "hide"
        document.getElementById("category-list").className = "show"
        document.getElementById("about-us").className = "hide"
    }

    showProductForm() {
        document.querySelector("div h1").innerHTML = "Formulario producto"
        document.getElementById("almacen").className = "hide"
        document.getElementById("new-cat").className = "hide"
        document.getElementById("new-prod").className = "show"
        document.getElementById("category-list").className = "hide"
        document.getElementById("about-us").className = "hide"
    }

    showCategoryForm() {
        document.querySelector("div h1").innerHTML = "Formulario categoría"
        document.getElementById("almacen").className = "hide"
        document.getElementById("new-prod").className = "hide"
        document.getElementById("new-cat").className = "show"
        document.getElementById("category-list").className = "hide"
        document.getElementById("about-us").className = "hide"
    }

    showAboutUs() {
        document.querySelector("div h1").innerHTML = "Sobre nosotros"
        document.getElementById("almacen").className = "hide"
        document.getElementById("new-prod").className = "hide"
        document.getElementById("new-cat").className = "hide"
        document.getElementById("category-list").className = "hide"
        document.getElementById("about-us").className = "show"
    }
}

module.exports = Controller
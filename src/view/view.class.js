class View {

    renderProduct(product) {
        const productUI = document.createElement('tr')
        productUI.id = `prod${product.id}`
        productUI.innerHTML = `
        <tr>
            <td>${product.id}</td>
            <td class="product-name">${product.name}</td>
            <td class="category">${product.category}</td>
            <td class="units">${product.units}</td>
            <td class="price">${product.price.toFixed(2)}/u</td>
            <td class="import">${product.productImport().toFixed(2)} €</td>
            <td>
                <button class="btn btn-secondary btn-dark raise-units">
                    <span class="material-icons">arrow_drop_up</span>
                </button>
                <button class="btn btn-secondary btn-dark lower-units" ${product.units <= 0 ? `disabled` : ``}>
                    <span class="material-icons">arrow_drop_down</span>
                </button>
                <button class="btn btn-default btn-dark edit">
                    <span class="material-icons">edit</span>
                </button>
                <button class="del-prod btn btn-danger">
                    <span class="material-icons">delete</span>
                </button>
            </td>
        </tr>`
        const tbodyUI = document.querySelector('#almacen tbody')
        tbodyUI.appendChild(productUI)
        return productUI
    }

    renderPaintedProduct(product) {
        const productUI = document.getElementById(`prod${product.id}`)
        productUI.querySelector(".product-name").innerHTML = `${product.name}`
        productUI.querySelector(".category").innerHTML = `${product.category}`
        productUI.querySelector(".units").innerHTML = `${product.units}`
        productUI.querySelector(".price").innerHTML = `${product.price.toFixed(2)}/u`
        productUI.querySelector(".import").innerHTML = `${product.productImport().toFixed(2)} €`
        product.units > 0 ? productUI.querySelector(".lower-units").removeAttribute("disabled") : productUI.querySelector(".lower-units").setAttribute("disabled", "")
    }

    deleteProductRender(product) {
        const productUI = document.getElementById(`prod${product.id}`)
        productUI.parentElement.removeChild(productUI)
    }

    renderCategory(category) {
        const categoryUI = document.createElement('tr')
        categoryUI.id = `cat${category.id}`
        categoryUI.innerHTML = `
        <tr>
            <td>${category.id}</td>
            <td class="category-name">${category.name}</td>
            <td class="description">${category.description}</td>
            <td>
                <button class="edit-cat btn btn-dark">
                    <span class="material-icons">edit</span>
                </button>
                <button class="del-cat btn btn-danger">
                    <span class="material-icons">delete</span>
                </button>
            </td>
        </tr>`
        const tbodyUI = document.querySelector('#category-list tbody')
        tbodyUI.appendChild(categoryUI)
        return categoryUI
    }

    renderPaintedCategory(category) {
        const categoryUI = document.getElementById(`cat${category.id}`)
        categoryUI.querySelector(".category-name").innerHTML = `${category.name}`
        categoryUI.querySelector(".description").innerHTML = `${category.description}`
    }

    deleteCategoryRender(category) {
        const categoryUI = document.getElementById(`cat${category.id}`)
        categoryUI.parentElement.removeChild(categoryUI)
    }

    renderMessage(err) {
        const messageUI = document.getElementById('messages')
        const div = document.createElement("div")
        div.classList = `alert alert-danger alert-dismissible`
        div.setAttribute(`role`, `alert`)
        div.innerHTML += `
    		${err}
	    	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>`
        messageUI.appendChild(div)

        setTimeout(function() {
            div.remove()
        }, 3000)
    }

    renderCategoryOption(category) {
        const categoryUI = document.createElement('option')
        categoryUI.value = category.id
        categoryUI.id = category.id
        categoryUI.innerHTML = `${category.name}`
        const optionUI = document.querySelector('#newprod-cat')
        optionUI.appendChild(categoryUI)
    }

    deleteCategoryOptionRender(category) {
        document.querySelector(`#newprod-cat option[value="${category.id}"]`).remove() 
    }

    renderTotalImport(store) {
        const importUI = document.querySelector("#total-import")
        importUI.innerHTML = `${store.totalImport().toFixed(2)} €`
    }
}

module.exports = View
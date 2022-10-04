class View {

    renderProduct(product) {
        const productUI = document.createElement('tr');
        productUI.innerHTML = `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.units}</td>
            <td>${product.price}/u</td>
            <td>${product.productImport()} €</td>
            <td></td>
        </tr>`
        const tbodyUI = document.querySelector('#almacen tbody');
        tbodyUI.appendChild(productUI);
    }

    renderMessage(err) {
        const messageUI = document.getElementById('messages');
        messageUI.innerHTML = `
        <div class="alert alert-danger alert-dismissible" role="alert">
    		${err}
	    	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>
		</div>`;
    }

    renderCategory(category) {
        const categoryUI = document.createElement('option');
        categoryUI.innerHTML = `<option value="${category.id}">${category.name}</option>`
        const optionUI = document.querySelector('#newprod-cat');
        optionUI.appendChild(categoryUI);
    }
}

module.exports = View;
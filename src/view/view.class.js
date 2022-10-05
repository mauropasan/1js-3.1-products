class View {

    renderProduct(product) {
        const productUI = document.createElement('tr');
        productUI.id = product.id;
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

    deleteProductRender(product) {
        const productUI = document.getElementById(`${product.id}`);
        productUI.parentElement.removeChild(productUI);
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
        categoryUI.value = category.id;
        categoryUI.id = category.id;
        categoryUI.innerHTML = `${category.name}`;
        const optionUI = document.querySelector('#newprod-cat');
        optionUI.appendChild(categoryUI);
    }

    deleteCategoryRender(category) {
        document.querySelector(`#newprod-cat option[value="${category.id}"]`).remove(); 
    }

    renderTotalImport(store) {
        const importUI = document.querySelector("#total-import");
        importUI.innerHTML = `<th>${store.totalImport().toFixed(2)} €</th>`;
    }
}

module.exports = View;
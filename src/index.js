'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()
myController.init();

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', (event) => {
  myController.showProducts(event);

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault();
    // Aquí el código para obtener los datos del formulario
    const id = document.getElementById("newprod-id").value;
    const name = document.getElementById('newprod-name').value
    const price = parseInt(document.getElementById('newprod-price').value);
    const category = parseInt(document.getElementById('newprod-cat').value);
    const units = parseInt(document.getElementById('newprod-units').value);
    // ...
    myController.showProducts(event);
    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    id === "" ? myController.addProductToStore({ name, price, category, units }) : myController.editProductFromStore({id, name, price, category, units});
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // )
    document.getElementById('new-prod').reset();
  });

  document.querySelector(".products-page").addEventListener('click', (event) => {
    myController.showProducts(event);
  });

  document.querySelector(".categories-page").addEventListener('click', (event) => {
    myController.showCategories(event);
  });

  document.querySelector(".new-prod-page").addEventListener('click', (event) => {
    myController.showProductForm(event);
  });

  document.getElementById('new-cat').addEventListener('submit', (event) => {
    myController.showCategories(event);

    const id = document.getElementById('newcat-id').value;
    const name = document.getElementById('newcat-name').value
    const description = document.getElementById('newcat-description').value;

    id === "" ? myController.addCategoryToStore({ name, description }) : myController.editCategoryFromStore({id, name, description});
    document.getElementById('new-cat').reset();
  });

  document.querySelector(".new-cat-page").addEventListener('click', (event) => {
    myController.showCategoryForm(event);
  });

  document.querySelector(".about-us-page").addEventListener('click', (event) => {
    myController.showAboutUs(event);
  });
});

'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()
myController.init()

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const name = document.getElementById('newprod-name').value
    const price = parseInt(document.getElementById('newprod-price').value);
    const category = parseInt(document.getElementById('newprod-cat').value);
    const units = parseInt(document.getElementById('newprod-units').value);
    // ...
    
    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    myController.addProductToStore({ name, price, category, units });
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // ) 
  })

  document.getElementById('new-cat').addEventListener('submit', (event) => {
    event.preventDefault()
    const name = document.getElementById('newcat-name').value
    const description = document.getElementById('newcat-description').value

    myController.addCategoryToStore({ name, description });
  })

  document.getElementById('del-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteProductFromStore(document.getElementById('delprod-id').value)      
  })

  document.getElementById('del-cat').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteCategoryFromStore(document.getElementById('delcat-id').value)      
  })

})

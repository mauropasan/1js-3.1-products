const Category = require('./category.class');
const Product = require('./product.class');
const datosIni = require('./datosIni.json');

// Aquí la clase Store
class Store {
    constructor( id, name, products = [], categories = []) {
        this.id = id,
        this.name = name,
        this.products = products,
        this.categories = categories
    }

    init() {
        datosIni.categories.forEach(categoryData => {
            let cat = new Category(categoryData.id, categoryData.name, categoryData.description);
            this.categories.push(cat)});
        datosIni.products.forEach(productData => {
            let prod = new Product(productData.id, productData.name, productData.category, productData.price, productData.units)
            this.products.push(prod)});
     }

    getCategoryById(id) {
        let category = this.categories.find( category => category.id === id );
        if (!category) {
            throw `No se ha encontrado la categoria con id ${id}`;
        }
        return category;
    }

    getCategoryByName(name) {
        let category = this.categories.find( category => category.name.toLowerCase() === name.toLowerCase() );
        if (!category) {
            throw `No se ha encontrado la categoria con nombre ${name}`;
        }
        return category;
    }

    getProductById(id) {
        let product = this.products.find( product => product.id === id);
        if (!product) {
            throw `No se ha encontrado el producto con id ${id}`;
        }
        return product;
    }

    getProductsByCategory(id) {
        let products = this.products.filter( product => product.category === id);
        if (!products) {
            throw `No se ha encontrado productos con la categoria ${this.getCategoryById(id).name}`;
        }
        return products;
    }

    addCategory(name, description = 'No hay descripción') {
        let id = this.categories.length === 0 ? 1 : this.categories.reduce((max, category) => category.id > max ? category.id : max, 0) + 1;
        if(!name || name === "") {
            throw `No se puede añadir una categoria sin nombre`;
        }
        try {
            this.getCategoryByName(name);
            
        } catch {
            let category = new Category(id, name, description);
            this.categories.push(category);
        return category;
        }
        throw `La categoria a la que es vol afegir te la mateixa id o el mateix nom`;
    }

    addProduct(payload) {
        let id = this.products.length === 0 ? 1 : this.products.reduce((max, product) => product.id > max ? product.id : max, 0) + 1;
        let product = new Product(id, payload.name, payload.category, payload.price, payload.units);
        try {
            if(!product.name ||
                product.name === "" ||
                !product.category ||
                !product.price ||
                typeof product.price !== 'number' ||
                typeof product.units !== 'number' ||
                product.price < 0 ||
                product.units < 0 ||
                !Number.isInteger(product.units) ||
                !this.getCategoryById(payload.category)) {
                    throw `Los datos introducidos són incorrectos`;
                } else {
                    this.products.push(product);
                }
            return product;
        } catch {
            throw `Los datos introducidos són incorrectos`;
        }
    }

    delCategory(id) {
        let category = this.getCategoryById(id);
        let categoryProducts = this.getProductsByCategory(id);
        if (categoryProducts.length === 0) {
            this.categories.splice(this.categories.findIndex( category => category.id === id ));
        } else {
            throw `Esta categoria tiene productos`;
        }
        return category;
    }

    delProduct(id) {
        let product = this.getProductById(id);
        if (!product) {
            throw `El producto no existe`;
        }
        if (product.units > 0) {
            throw `El producto tiene stock`;
        }
        this.products.splice(this.products.findIndex( product => product.id === id ));
        return product;
    }

    totalImport() {
        let total = 0;
        for (let product of this.products) {
            total += product.price;
        }
        return total;
    }

    orderByUnitsDesc() {
        return this.products.sort( (product, nextProduct) => nextProduct.units - product.units );
    }

    orderByName() {
        return this.products.sort( (product, nextProduct) => product.name.localeCompare(nextProduct.name));
    }

    underStock(units) {
        return this.products.filter( product => product.units < units);
    }

    toString() {
        let string = `Almacén ${this.id} => ${this.products.length} productos: ${this.totalImport().toFixed(2)} €`;
        this.products.forEach((prod) => string += '\n- ' + prod);
        return string;
    }
}

module.exports = Store


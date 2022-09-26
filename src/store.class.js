const Category = require('./category.class');
const Product = require('./product.class');

// Aquí la clase Store
class Store {
<<<<<<< HEAD
    constructor( id, name, products = [], categories = [] ) {
=======
    constructor( id, name, products, categories ) {
>>>>>>> fix
        this.id = id,
        this.name = name,
        this.products = products,
        this.categories = categories
    }

    getCategoryById(id) {
        let category = this.categories.find( category => category.id === id );
        if (category === undefined) {
            throw `No s'ha trovat la categoria amb l'id ${id}`;
        }
        return category;
    }

    getCategoryByName(name) {
        let category = this.categories.find( category => category.name.toLowerCase() === name.toLowerCase() );
        if (category === undefined) {
            throw `No s'ha trovat la categoria amb el nom ${name}`;
        }
        return category;
    }

    getProductById(id) {
        let product = this.products.find( product => product.id === id);
        if (product === undefined) {
            throw `No s'ha trovat el producte amb l'id ${id}`;
        }
        return product;
    }

    getProductsByCategory(id) {
        let products = this.products.filter( product => product.category === id);
        if (products === undefined) {
            throw `No s'han trovat productes que té categoria ${this.getCategoryById(id).name}`;
        }
        return products;
    }

    addCategory(name, [description]) {
<<<<<<< HEAD
        let id = this.categories.length === 0 ? 1 : this.categories.reduce((max, id) => id > max ? id : max ) + 1;
        let category = new Category( id, name, description);
        try {
            if (this.getCategoryByName(name)) {
                throw `La categoria a la que es vol afegir te el mateix nom`;
            }
        } catch {
            this.categories.push(category);
            return category;
=======
        let id = this.categories.length === 0 ? 1 : this.categories.reduce((max, id) => id > max ? id + 1 : max + 1);
        let category = new Category(id, name, description);
        try {
            if (this.getCategoryById(category.id) || this.getCategoryByName(name)) {
                throw `La categoria a la que es vol afegir te la mateixa id o el mateix nom`;
            }
            this.categories.push(category);
            return category;
        } catch {
            throw(error);
>>>>>>> fix
        }
    }

    addProduct(payload) {
<<<<<<< HEAD
        let id = this.products.length === 0 ? 1 : this.products.reduce((max, id) => id > max ? id : max ) + 1;
        let product = new Product( id, payload.name, payload.category, payload.price, payload.units);
        try {
            if(!product.name ||
                (!product.category || !this.getCategoryByName()) ||
                (!product.price || product.price < 0) ||
                (!product.units < 0)) {
                    throw `Les dades introduïdes són incorrectes`;
                }
            return product;
        } catch {
            this.products.push(product);
            return product;
        }
=======
        let id = this.products.length === 0 ? 1 : this.products.reduce((max, id) => id > max ? id + 1 : max + 1);
        let product = new Product(id, payload.name, payload.category, payload.price, payload.units);
        if(!product.name ||
            (!product.category || !this.getCategoryByName()) ||
            (!product.price || product.price < 0) ||
            (!product.units < 0)) {
                throw `Les dades introduïdes són incorrectes`;
            }
        return product;
>>>>>>> fix
    }

    delCategory(id) {
        let category = this.getCategoryById(id);
<<<<<<< HEAD
        if( this.getProductsByCategory(category).length ) {
            throw `No es pot borrar una categoria que té productes`;
        }
        this.categories.splice(this.categories.findIndex( category => category.id === id, 1 ));
        return category;
    }

    delProduct(id) {
        let product = this.getProductById(id);
        if ( !product ) {
            throw `No es trova el producte amb id ${id}`;
        }
        this.products.splice(this.products.findIndex( product => product.id === id, 1));
        return product;
    }

    totalImport() {
        this.products.reduce(productImport());
    }

    orderByUnitsDesc() {
        return this.products.sort( units );
    }

    orderByName() {
        return this.products.sort( name );
    }

    underStock(units) {
        return this.products.filter( product => product.units < units );
=======
        if(category) {
            throw `No es pot borrar una categoria que té productes`;
        }
        this.categories.splice(this.categories.findIndex(category.id));
    }

    delProduct(id) {
        return Product;
    }

    totalImport() {
        return 0;
    }

    orderByUnitsDesc() {
        return Product[0];
    }

    orderByName() {
        return Product[0];
    }

    underStock(units) {
        return Product[0];
>>>>>>> fix
    }

    toString() {
        return '';
    }
}

module.exports = Store


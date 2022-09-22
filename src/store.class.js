const Category = require('./category.class');
const Product = require('./product.class');

// Aquí la clase Store
class Store {
    constructor( id, name, products, categories ) {
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
        let category = new Category(this.categories.reduce((max, id) => id > max ? id + 1 : max + 1), name, description);
        try {
            if (this.getCategoryById(category.id) || this.getCategoryByName(name)) {
                throw `La categoria a la que es vol afegir te la mateixa id o el mateix nom`;
            }
            this.categories.push(category);
            return category;
        } catch {
            throw(error);
        }
    }

    addProduct(payload) {
        let product = new Product(this.products.reduce((max, id) => id > max ? id + 1 : max + 1), payload.name, payload.category, payload.price, payload.units);
        if(!product.name ||
            (!product.category || !this.getCategoryByName()) ||
            (!product.price || product.price < 0) ||
            (!product.units < 0)) {
                throw `Les dades introduïdes són incorrectes`;
            }
        return product;
    }

    delCategory(id) {
        let category = this.getCategoryById(id);
        this.categories.splice();
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
    }

    toString() {
        return '';
    }
}

module.exports = Store


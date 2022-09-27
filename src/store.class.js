const Category = require('./category.class');
const Product = require('./product.class');

// Aquí la clase Store
class Store {
    constructor( id, name, products = [], categories = []) {
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

    addCategory(name, description = 'No hay descripción') {
        let id = this.categories.length === 0 ? 1 : this.categories.reduce((max, category) => category.id > max ? category.id : max, 0) + 1;
        let category = new Category(id, name, description);
        if(!name) {
            throw "No es pot crear una categoria sense nom";
        }
        try {
            if (this.getCategoryById(category.id) ||
                this.getCategoryByName(name)) {
                throw `La categoria a la que es vol afegir te la mateixa id o el mateix nom`;
            }
        } catch {
            this.categories.push(category);
            return category;
        }
    }

    addProduct(payload) {
        let id = this.products.length === 0 ? 1 : this.products.reduce((max, product) => product.id > max ? product.id : max, 0) + 1;
        let product = new Product(id, payload.name, payload.category, payload.price, payload.units);
        if(!product.name ||
            !product.category ||
            !product.price ||
            typeof product.price !== 'number' ||
            typeof product.units !== 'number' ||
            product.price < 0 ||
            product.units < 0) {
                throw `Les dades introduïdes són incorrectes`;
            }
            this.products.push(product);
        return product;
    }

    delCategory(id) {
        let category = this.getCategoryById(id);
        if(!category) {
            throw `La categoria no existeix`;
        }
        let categoryProducts = this.getProductsByCategory(id);
        if (categoryProducts.length === 0) {
            this.categories.splice(this.categories.findIndex( category => category.id === id ));
        }
        return category;
    }

    delProduct(id) {
        let product = this.getProductById(id);
        if(!product) {
            throw `El producte no existeix`;
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
        return this.products.sort( (product, nextProduct) => product.units - nextProduct.units );
    }

    orderByName() {
        return this.products.sort( (product, nextProduct) => product.name.localeCompare(nextProduct.name));
    }

    underStock(units) {
        return this.products.filter( product => product.units < units);
    }

    toString() {
        return '';
    }
}

module.exports = Store


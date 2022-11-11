const Category = require('./category.class')
const Product = require('./product.class')
const SERVER = 'http://localhost:3000'

// Aquí la clase Store
class Store {
    constructor(id, name, products = [], categories = []) {
        this.id = id,
            this.name = name,
            this.products = products,
            this.categories = categories
    }

    async init() {
        await this.getTable('categories')
            .then((categories) => categories.forEach(category => {
                this.categories.push(new Category(category.id, category.name, category.description))}))
            .catch((error) => console.log(error))
        await this.getTable('products')
            .then((products) => products.forEach(product => {
                this.products.push(new Product(product.id, product.name, product.category, product.price, product.units))}))
            .catch((error) => console.log(error))
    }

    async getTable(table) {
        const response = await fetch(`${SERVER}/${table}`)
        if(!response.ok) {
            throw `Error ${response.status}: ${response.statusText}`
        }
        const posts = await response.json()
        return posts
    }

    async get(table, id) {
        const response = await fetch(`${SERVER}/${table}/${id}`)
        if(!response.ok) {
            throw `Error ${response.status}: ${response.statusText}`
        }
        const posts = await response.json()
        return posts
    }

    async post(table, data) {
        const response = await fetch(`${SERVER}/${table}`, { method: 'POST', headers: {Accept: 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)})
        if(!response.ok) {
            throw `Error ${response.status}: ${response.statusText}`
        }
        const posts = await response.json()
        return posts
    }

    async put(table, data) {
        const response = await fetch(`${SERVER}/${table}/${data.id}`, { method: 'PUT', headers: {Accept: 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(data)})
        if(!response.ok) {
            throw `Error ${response.status}: ${response.statusText}`
        }
        const post = await response.json()
        return post
    }

    async delete(table, id) {
        const response = await fetch(`${SERVER}/${table}/${id}`, { method: 'DELETE' })
        if(!response.ok) {
            throw `Error ${response.status}: ${response.statusText}`
        }
        const post = await response.json()
        return post
    }

    hasSameProductName(id, name) {
        return this.products.find(prod => prod.name === name && prod.id !== id)
    }

    async getCategoryById(id) {
        let category = await this.get('categories', id)
        if (!category) {
            throw `No se ha encontrado la categoria con id ${id}`
        }
        return category
    }

    getCategoryByName(name) {
        let category = this.categories.find(cat => cat.name.toLowerCase() === name.toLowerCase())
        if (!category) {
            throw `No se ha encontrado la categoria con nombre ${name}`
        }
        return category
    }

    async getProductById(id) {
        let product = await this.get('products', id)
        if (!product) {
            throw `No se ha encontrado el producto con id ${id}`
        }
        return product
    }

    getProductsByCategory(id) {
        let products = this.products.filter(prod => prod.category === id)
        if (!products) {
            throw `No se ha encontrado productos con la categoria ${this.getCategoryById(id).name}`
        }
        return products
    }

    async addCategory(payload) {
        if (!payload.name || payload.name === "") {
            throw `No se puede añadir una categoria sin nombre`
        }
        try {
            this.getCategoryByName(name)

        } catch {
            let category = new Category(payload.id, payload.name, payload.description = 'No hay descripción')
            await this.put('categories', category)
            this.categories.push(category)
            return category
        }
        throw `La categoria que desea añadir ya existe`
    }

    async addProduct(payload) {
        let product = new Product(payload.id, payload.name, payload.category, payload.price, payload.units)
        try {
            if (!product.name ||
                product.name === "" ||
                !product.category ||
                !product.price ||
                typeof product.price !== 'number' ||
                typeof product.units !== 'number' ||
                product.price < 0 ||
                product.units < 0 ||
                !Number.isInteger(product.units) ||
                !this.getCategoryById(product.category)) {
                throw `Los datos introducidos són incorrectos`
            } else {
                await this.put('products', product)
                this.products.push(product)
            }
            return product
        } catch {
            throw `Los datos introducidos són incorrectos`
        }
    }

    async delCategory(id) {
        let category = await this.getCategoryById(id)
        let categoryProducts = this.getProductsByCategory(id)
        if (categoryProducts.length === 0) {
            this.categories.splice(this.categories.findIndex(cat => cat.id === id), 1)
        } else {
            throw `Esta categoria tiene productos`
        }
        return category
    }

    modCat(payload) {
        let cat = this.getCategoryById(payload.id)
        cat.name = payload.name
        cat.description = payload.description
        return cat
    }

    async delProduct(id) {
        let product = await this.getProductById(id)
        if (!product) {
            throw `El producto no existe`
        }
        if (product.units > 0) {
            throw `El producto tiene stock`
        }
        this.delete('products', id)
        this.products.splice(this.products.findIndex(prod => prod.id === id), 1)
        return product
    }

    async modProd(payload) {
        const prod = await this.put('products', payload)
        let prodStore = this.getProductById(payload.id)
        prodStore.name = prod.name
        prodStore.category = prod.category
        prodStore.units = prod.units
        prodStore.price = prod.price
        return prodStore
    }

    totalImport() {
        return this.products.reduce((total, prod) => total + prod.productImport(), 0)
    }

    orderByUnitsDesc() {
        return this.products.sort((product, nextProduct) => nextProduct.units - product.units)
    }

    orderByName() {
        return this.products.sort((product, nextProduct) => product.name.localeCompare(nextProduct.name))
    }

    underStock(units) {
        return this.products.filter(product => product.units < units)
    }

    toString() {
        let string = `Almacén ${this.id} => ${this.products.length} productos: ${this.totalImport().toFixed(2)} €`
        this.products.forEach((prod) => string += '\n- ' + prod)
        return string
    }
}

module.exports = Store


// Aquí la clase Category

class Category {
    constructor(id, name, description = 'No hay descripción') {
        this.id = id,
        this.name = name,
        this.description = description
    }

    toString() {
        return `Categoria: ${this.name}, Descripció: ${this.description}`;
    }

}

module.exports = Category

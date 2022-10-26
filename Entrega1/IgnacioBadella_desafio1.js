class Usuario {

    constructor(nombre = "", apellido = "") {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = []
        this.mascotas = []

    }

    getFullName() {
        console.log(`Nombre de usuario complpeto : ${this.nombre} ${this.apellido}`)
    }

    addMascotas(mascota) {
        this.mascotas.push(mascota)
        console.log(`Se agrego ${this.mascotas[this.mascotas.length - 1]} a mascotas`)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addLibros(titulo = "", autor = "") {
        this.libros.push({ titulo: titulo, autor: autor })
    }

    getBooksNames() {
        let booknames = []
        if (this.libros.length >= 1) {

            this.libros.forEach(libro => {
                booknames.push(libro.titulo)
            });
            return booknames;
        } else {
            console.log("El usuario no tiene libros")
            return 0;
        }
    }

}

const usuario1 = new Usuario("Ignacio", "Badella");
usuario1.getFullName();
usuario1.addMascotas("Firulais");
usuario1.addMascotas("Silvestre");
usuario1.addMascotas("Pirulin");
console.log(`Total de mascotas del usuario: ${usuario1.countMascotas()}`)
usuario1.addLibros("Harry Potter", "Marc Anthony")
usuario1.addLibros("Don Quijote", "Miguel de Cervantes")
console.log(`Libros del usuario: ${usuario1.getBooksNames()}`)
usuario1.addLibros("Historia de dos ciudades", "Charles Dickens")
usuario1.addLibros("El Señor de los Anillos", "Tolkien ")
console.log(`Libros del usuario: ${usuario1.getBooksNames()}`)

const usuario2 = new Usuario("Martin", "Perez");
usuario2.getFullName();
console.log(`Total de mascotas del usuario: ${usuario2.countMascotas()}`)
usuario2.addMascotas("Bugs Bunny");
usuario2.addMascotas("Piolin");
console.log(`Total de mascotas del usuario: ${usuario2.countMascotas()}`)
console.log(`Libros del usuario: ${usuario2.getBooksNames()}`)


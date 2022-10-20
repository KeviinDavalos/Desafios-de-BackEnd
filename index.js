class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = [];
        this.libros = [];
    }

    getFullName = () => {
        return (`Hola soy ${this.nombre} ${this.apellido}`)
    }
    addMascota = (mascota) => {
        this.mascotas.push(mascota);
    }
    countMascotas = () => {
        return (`Tengo ${this.mascotas.length} mascotas`);
    }
    addBook = (nombre, autor) => {
        return this.libros.push({
            nombre: nombre, 
            autor: autor
        })
    }
    getBookNames = () => {
        return this.libros.map(libro => libro.nombre);
    }
}

const usuario1 = new Usuario("Kevin", "Davalos")
console.log(`${usuario1.getFullName()}`)

usuario1.addMascota("Perro")
usuario1.addMascota("Perro")
usuario1.addMascota("Gato")
console.log(`${usuario1.countMascotas()}`)

usuario1.addBook("El buen hijo", "desconocido");
usuario1.addBook("Hijitus", "desconocido");
console.log(`Los libros son: ${usuario1.getBookNames()}`)

const fs = require("fs");

class Contenedor {
    constructor(nombreDelArchivo) {
        this.nombre = nombreDelArchivo
    }

    async getAll() {
        let datosArchivo = []
        try {
            datosArchivo = await fs.promises.readFile(`${this.nombre}.json`, "utf-8") 
            datosArchivo = JSON.parse(datosArchivo)
        } catch(error) {
            console.log(error) 
        }
        return datosArchivo
    }
       
    async save(objeto) { 
        let datosArchivo = await this.getAll()
        let idAAgregar        
        if (datosArchivo.length === 0) { 
            idAAgregar = 1 
        } else {
            idAAgregar = datosArchivo[datosArchivo.length-1].id + 1 
        }
        objeto.id = idAAgregar 
        datosArchivo.push(objeto) 
        datosArchivo = JSON.stringify(datosArchivo, null, "\t") 
        await fs.promises.writeFile(`${this.nombre}.json`, datosArchivo) 
        return idAAgregar 
    }

    async getById(id) { 
        const datosArchivo = await this.getAll()
        return datosArchivo.some(objeto => objeto.id === id) ? datosArchivo.find(objeto => objeto.id === id) : null
    }

    async deleteById(id) { 
        let datosArchivo = await this.getAll()
        datosArchivo = datosArchivo.filter(objeto => objeto.id !== id)
        datosArchivo = JSON.stringify(datosArchivo, null, "\t")
        await fs.promises.writeFile(`${this.nombre}.json`, datosArchivo) 
    }

    async deleteAll() {
        try { 
            await fs.promises.readFile(`${this.nombre}.json`, "utf-8")
            await fs.promises.writeFile(`${this.nombre}.json`, "[]")
        } catch(error) {
            console.log(error)
        }
    }
}

const producto1 = {
    title: "Título 1",
    price: 100,
    img: "https://dummyimage.com/600x400/000/fff"
}

const producto2 = {
    title: "Título 2",
    price: 200,
    img: "https://dummyimage.com/600x400/000/fff"
}

const producto3 = {
    title: "Título 3",
    price: 300,
    img: "https://dummyimage.com/600x400/000/fff"
}

const contenedor = new Contenedor("productos") 

const comprobarMetodos = async () => {
    try {
        const primerId = await contenedor.save(producto1) 
        console.log(`El id del objeto agregado es: ${primerId}`)
    
        const segundoId = await contenedor.save(producto2) 
        console.log(`El id del objeto agregado es: ${segundoId}`)
    
        const tercerId = await contenedor.save(producto3)
        console.log(`El id del objeto agregado es: ${tercerId}`)

        const cuartoId = await contenedor.save(producto2) 
        console.log(`El id del objeto agregado es: ${cuartoId}`)
        
        console.log("\nLos objetos son:")

        const objeto1 = await contenedor.getById(primerId)
        console.table(objeto1)
    
        const objeto2 = await contenedor.getById(segundoId)
        console.table(objeto2)

        const objeto3 = await contenedor.getById(tercerId)
        console.table(objeto3)
    
        const objeto4 = await contenedor.getById(cuartoId)
        console.table(objeto4)

        const todosLosObjetos = await contenedor.getAll()
        console.log("\nLa siguiente tabla muestra todos los objetos:")
        console.table(todosLosObjetos)

        await contenedor.deleteById(tercerId)
        await contenedor.deleteById(cuartoId)
        console.log(`\nTodos los objetos sin los objetos con id ${tercerId} y ${cuartoId}:`)
        console.table(await contenedor.getAll())

        await contenedor.deleteAll()
        console.log(`\nToda la lista quedó borrada. Pruebo:`)
        console.log(await contenedor.getAll())

    } catch(error) {
        console.log(error)
    }
}

comprobarMetodos()

/*  ------  Desafio 1 -------
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
*/
const Container = require('./container.js')

const products = [
{ title: 'Pc mouse', price: 150, thumbnail: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80' },
{ title: 'Monitor', price: 3500, thumbnail: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80' },
{ title: 'Keyboard', price: 550, thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80' }
]
contenedor = new Container('productos.txt')

async function productLoad(){
    try{
        //Agregamos productos al archivo:
        for (const product of products){
            await contenedor.save(product)
            .then(data => console.log('Product added succefully , id: ' + data))
            .catch((err) => {
                console.log(err)
            })
        }
        //mostramos un producto por su id
        console.log('The product selected is: ')
        await contenedor.getById(2)
        .then(data => console.log(JSON.stringify(data)))
        .catch((err) => {
            console.log(err)
        })
        //mostarmos la lista completa:
        console.log('Total product list is :')
        await contenedor.getAll()
        .then(data => console.log(data))
        .catch((err) => {
            console.log(err)
        })
        //borramos un producto por su Id
        await contenedor.deleteById(6)
        .then()
        .catch((err) => {
            console.log(err)
        })
        //borramos todos los productos del archivo
        await contenedor.deleteAll()
        .then()
        .catch((err) => {
            console.log(err)
        })
    }catch(err){
        console.log(`Error : ${err}`)
    }
}
productLoad()


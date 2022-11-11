const Container = require('./container.js')

contenedor = new Container('productos.txt')

/* const products = [
    { title: 'Pc mouse', price: 150, thumbnail: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80' },
    { title: 'Monitor', price: 3500, thumbnail: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80' },
    { title: 'Keyboard', price: 550, thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80' }
]
async function productLoad() {
    for (const product of products) {
        await contenedor.save(product)
            .then(data => console.log('Product added succefully , id: ' + data))
            .catch((err) => {
                console.log(err)
            })
    }
}
productLoad() */
const express = require('express')
const app = express()
const getRandomid = () => parseInt(Math.random() * 3) + 1
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor prendido escuchando el puerto: ${PORT}`)
})
//RUTAS
app.get('/', (req, res) => { // Get a Random product available on the server.
    //throw new Error(`Servidor`)
    res.send(`<h1>Servidor de Express</h1>`)
})
app.get('/products', (req, res) => { // Get products available on the server.
    contenedor.getAll()
        .then(data => res.end(JSON.stringify(data, null, 3)))
        .catch((err) => {
            throw new Error(`Servidor ${err}`)
        })

})

app.get('/productRandom', (req, res) => { // Get a Random product available on the server.
    contenedor.getById(getRandomid())
    .then(data => res.end(JSON.stringify(data, null, 3)))
    .catch((err) => {
        throw new Error(`Servidor ${err}`)
    })
})

server.on('error', (err) => { console.error(` =====> ERROR: ${err}`) })



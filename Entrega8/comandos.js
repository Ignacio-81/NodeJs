//use ecommerce
db.createCollection("products")
db.createCollection("messages")

db.products.insertMany([
    {
        title: "Keyboard",
        price: 550,
        thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80",

    },
    {
        title: "Pc mouse",
        price: 150,
        thumbnail: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",

    },
    {
        title: "Monitor",
        price: 4500,
        thumbnail: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",

    },
    {
        title: "Auto ",
        price: 3500,
        thumbnail: "https://img.freepik.com/psd-premium/imagen-tridimensional-coche_53876-1716.jpg?w=2000",
    },
    {
        title: "Escalera",
        price: 232,
        thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80",

    },
    {
        title: "Regla",
        price: 101,
        thumbnail: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",

    },
    {
        title: "Mouse",
        price: 122,
        thumbnail: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",

    },
    {
        title: "Mate",
        price: 120,
        thumbnail: "https://img.freepik.com/psd-premium/imagen-tridimensional-coche_53876-1716.jpg?w=2000",
    },
    {
        title: "Yerba",
        price: 660,
        thumbnail: "https://img.freepik.com/psd-premium/imagen-tridimensional-coche_53876-1716.jpg?w=2000",
    },
    {
        title: "TErmo",
        price: 2700,
        thumbnail: "https://img.freepik.com/psd-premium/imagen-tridimensional-coche_53876-1716.jpg?w=2000",
    }
])

db.messages.insertMany([
    {
        username: "Ignacio@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "Hola",
    },
    {
        username: "Federicoo@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "Que tal?",
    },
    {
        username: "Ignacio@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "Todo bien",
    },
    {
        username: "Federicoo@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "Buenisimo",
    },
    {
        username: "Ignacio@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "Bien el curso?",
    },
    {
        username: "Federicoo@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "Si fantastico",
    },
    {
        username: "Maria@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "Yo me lo perdi!",
    },
    {
        username: "Ignacio@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "Que pena",
    },
    {
        username: "Maria@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "voy mañana seguro",
    },
    {
        username: "Federicoo@mail.com",
        hour_date: "[26/12/2022, 20:20:53]",
        message: "Barbaro",
    }
])

db.products.find()
db.messages.find()

db.products.estimatedDocumentCount()
db.messages.estimatedDocumentCount()

//CRUD
//Create
db.products.insertOne(
    {
        title: "Telefono",
        price: 1350,
        thumbnail: "https://img.freepik.com/psd-premium/imagen-tridimensional-coche_53876-1716.jpg?w=2000",
    })

//Consult
db.products.find({ price: { $lt: 1000 } })
db.products.find({ $and: [{ price: { $lt: 3000 } }, { price: { $gt: 1000 } }] })
db.products.find({ price: { $gt: 3000 } })
db.products.find({}, { _id: 0, "title": 1 }).limit(1).skip(2).sort({ price: -1 })

//Update
db.products.updateMany({}, { $set: { "stock": 100 } }, { upsert: true })
db.products.updateMany({ price: { $gt: 4000 } }, { $set: { "stock": 0 } })

//Delete
db.products.deleteMany({ price: { $lt: 1000 } })

//create user Pepe , read

//use admin
db.createUser(
    {
        user: "myUserAdmin",
        pwd: "ignacio", // or cleartext password
        roles: [
            { role: "userAdminAnyDatabase", db: "admin" },
            { role: "readWriteAnyDatabase", db: "admin" }
        ]
    }
)

//mongod --auth --dbpath D:\Personal\CoderHouse\Node.Js\Trabajos\Repo\Entrega8\DBecommerce
//mongosh -u myUserAdmin -p ignacio --authenticationDatabase "admin"
//use admin
db.createUser({ user: 'pepe', pwd: 'asd456', roles: [{ role: 'read', db: 'ecommerce' }] })

//mongod --auth --dbpath D:\Personal\CoderHouse\Node.Js\Trabajos\Repo\Entrega8\DBecommerce
//mongosh -u pepe -p asd456 --authenticationDatabase "admin"


db.products.deleteOne({ title: "Telefono" })
import express from "express"
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Server as IOServer } from "socket.io";
import Container from "./db/DB-container.js";
import configMySql from './db/config_mysql.js'
import configSqlite from './db/config_sqlite.js'
import insertProds from "./table/create-prods.js"
import createProdTable from "./table/create-prod-table-mysql.js"
import createChatTable from "./table/create-chat-table-sqlite.js"

let dbProducts = new Container("products", configMySql)
let dbChats = new Container("chats", configSqlite)

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"));

try {
    //Create new chat table on SQlite DB
    await createChatTable("chats")
    //Create the new table on the database
    await createProdTable("products")

    //Insert Base products into the database
    await insertProds()

} catch (err) {
    console.error(err)
}

//Add product properly into the array with ID
/* const postProduct = (prod) => {
    let id
    if (!prod.title || !prod.price) {
        console.log("You must send title, price and url");
    } else {
        prod.price = parseInt(prod.price)
        if (!products.length == 0) {
            id = products.length + 1
        } else {
            id = 1
        }
        products.push({ 'id': id, ...prod })


    }
 }*/

const expressServer = app.listen(3000, () => console.log('listening on port 3000'));
app.on("error", (err) => {
    console.log(err)
})
const io = new IOServer(expressServer);

io.on("connection", async (socket) => {
    console.log(`New client connection ${socket.id}`);

    // send product for new client
    socket.emit("server:products", await dbProducts.getAll());

    // listen products from clients
    socket.on("client:productData", async (productData) => {
        // update product array
        console.log("product data : " + { productData })
        productData.price = parseInt(productData.price)
        await dbProducts.save(productData)

        // send product to all clients
        io.emit("server:products", await dbProducts.getAll());
    });
    //send chat message for new user
    socket.emit("server:message", await dbChats.getAll());

    // listen new message from chat
    socket.on("client:message", async (messageInfo) => {
        // update message array
        //messages.push(messageInfo);
        await dbChats.save(messageInfo)
        // send message to all users
        console.log("sqilite read" + await dbChats.getAll())
        io.emit("server:message", await dbChats.getAll());
    });
});

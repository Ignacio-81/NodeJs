import express from "express"
import { engine } from "express-handlebars"
import { dirname, join } from "path";
import { fileURLToPath } from "url";
//import routes from "./routes/products.route.js"
import { Server as IOServer } from "socket.io";

import Container from "./container.js";

let contenedor = new Container('./src/productos.txt')

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: join(__dirname, "/views/layouts/main.hbs"),
        layoutsDir: join(__dirname, "/views/layouts"),
        partialsDir: join(__dirname, "/views/partials"),
    })
)
app.set("view engine", "hbs")
app.set("views", join(__dirname, "/views"));
app.use("/static", express.static(__dirname + "/scripts"));


const expressServer = app.listen(3000, () => console.log('listening on port 3000'));
app.on("error", (err) => {
    console.log(err)
})
const io = new IOServer(expressServer);
const products = await contenedor.getAll()
const messages = [];
//app.use("/", routes);

//Add product properly into the array with ID
const postProduct = (prod) => {
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
        products.push({ ...prod, 'id': id })


    }
}


io.on("connection", (socket) => {
    console.log(`New client connection ${socket.id}`);

    // send product for new client
    socket.emit("server:products", products);

    // listen products from clients
    socket.on("client:productData", (productData) => {
        // update product array
        //products.push(productData);
        postProduct(productData)
        console.log("en el emit", products)
        const id = contenedor.save(products[products.length - 1])
        // send product to all clients
        io.emit("server:products", products);
    });
    //send chat message for new user
    socket.emit("server:message", messages);

    // listen new message from chat
    socket.on("client:message", (messageInfo) => {
        // update message array
        messages.push(messageInfo);

        // send message to all users
        io.emit("server:message", messages);
    });
});

app.get("/", (req, res) => {
    console.log("en el get", products);//debug optional

    res.status(201).render("products", { products, hasAny: true })
    //res.status(201).render("products")
});


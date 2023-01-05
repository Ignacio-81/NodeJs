import express, { urlencoded, json } from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
import Container from './data/container.js'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

export const productsRepo = new Container(__dirname + '/data/products.txt')
export let products = await productsRepo.readAll()

export const cartsRepo = new Container(__dirname + '/data/carts.txt')
export let carts = await cartsRepo.readAll()

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
//Route to specific routes for products and carts
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
//Use MDW to reporte bad routes or addresses 
app.use((req, res, next) => {
    res.json({ error: -2, description: `route ${req.route} of method ${req.method} is not implemented` })
});
//connecto to port 8080
app.listen(8080, () => { console.log('app listening on port: 8080') });
app.on("error", (err) => { console.log(err) })


import express, { urlencoded, json } from "express";
import products from "./routes/products.route.js"
import { fileURLToPath } from "url";
import {dirname} from "path" 

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/products', products)
app.use("/static", express.static(__dirname + "/public"));


app.listen(3000, () => {
    console.log("Server listening on Port 3000")
})

app.on("error", (err) => {
    console.log(err)
})

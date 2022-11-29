import express from "express"
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import routes from "./routes/products.route.js"

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"));

app.set("view engine", "ejs")
app.set("views", join(__dirname, "/views"));

app.use("/", routes);

app.listen(3000, () => console.log('listening on port 3000'));
app.on("error", (err) => {
    console.log(err)
})
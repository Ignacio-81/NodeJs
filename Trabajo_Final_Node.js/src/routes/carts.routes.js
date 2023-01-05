import { Router } from 'express';
import { products, carts, cartsRepo } from "../../src/server.js"

const router = Router();

// Get product from a cart with cart ID
router.get("/:id/products", (req, res) => {
    const cartselect = carts.find((carts) => carts.id === parseInt(req.params.id))
    if (!cartselect) {
        res.status(404).send("Cart not found with id : " + req.params.id);
    }
    if ((cartselect.products.length == 0) || (cartselect.products == "[]")) {
        //answer 404 : Not found
        res.status(404).send("Product Not Found on this cart, Cart is empty. ");
    }
    res.status(200).json(cartselect.products);
})


//Create a New Cart
router.post("/", (req, res) => {
    let id
    let newObj = req.body
    newObj.price = parseInt(newObj.price) //convert string number into number
    if (!carts.length == 0) {
        id = carts.length + 1
    } else {
        id = 1
    }
    let today = new Date();
    let date = today.toLocaleString()
    const newC = { 'id': id, 'products': [], 'timestamp': date }
    cartsRepo.write(newC)
    carts.push(newC)
    //return 201 created - send the Cart created
    res.status(201).json(carts.find((carts) => carts.id === id))
})

//Delete CArt by ID
router.delete('/:id', (req, res) => {
    if ((carts.length == 0) || (carts == "[]")) {
        res.status(400).send("There is no Cart on the server");
    }
    //Find object inside the array with the id 
    const objId = carts.findIndex((carts) => carts.id === parseInt(req.params.id))
    if (objId != -1) {
        carts.splice(objId, 1);
        cartsRepo.writeAll(carts)
        res.status(201).send('The cart with Id: ' + req.params.id + ' was deleted successfully')
    } else {
        console.log('The cart with Id: ' + req.params.id + ' does not exists')
        //answer 404 : Not found
        res.status(404).send('The cart with Id: ' + req.params.id + ' does not exists')
    }
})

router.route('/:id/products/:id_prod')
    // add a product using the ID  to a cart with ID.
    .put((req, res) => {
        const newObj = req.body
        if ((carts.length == 0) || (carts == "[]")) {
            res.status(400).send("There is no cart on the server");
        }
        //Find the object inside the array and see if it exists
        const cartId = carts.findIndex((carts) => carts.id === parseInt(req.params.id))

        if (cartId != -1) {
            const getProd = products.find((products) => products.id === parseInt(req.params.id_prod))
            if (getProd) {
                carts[cartId].products.push(getProd)
                cartsRepo.writeAll(carts)
                res.status(201).send('The Product with Id: ' + req.params.id_prod + ' was added successfully to cart id : ' + req.params.id)
            } else {
                console.log('The product with Id: ' + req.params.id_prod + ' does not exists on this cart')
                //answer 404 : Not found
                res.status(404).send('The product with Id: ' + req.params.id_prod + ' does not on this cart')
            }
        } else {
            console.log('The cart with Id: ' + req.params.id + ' does not exists')
            //answer 404 : Not found
            res.status(404).send('The cart with Id: ' + req.params.id + ' does not exists')
        }


    })
    // Delete a product from the cart by ID and by Cart ID
    .delete((req, res) => {
        if ((carts.length == 0) || (carts == "[]")) {
            res.status(400).send("There is no cart on the server");
        }
        //Find object inside the array with the id 
        const cartId = carts.findIndex((carts) => carts.id === parseInt(req.params.id))
        if (cartId != -1) {
            const cartProds = carts[cartId].products
            const objId = cartProds.findIndex((cartProds) => cartProds.id === parseInt(req.params.id_prod))
            if (objId != -1) {

                cartProds.splice(objId, 1);
                carts[cartId].products = cartProds
                cartsRepo.writeAll(carts)
                res.status(201).send('The product Id: ' + req.params.id_prod + ' was deleted successfully from cart with id:' + req.params.id)
            } else {
                console.log('The product with Id: ' + req.params.id_prod + ' does not exists on this cart')
                //answer 404 : Not found
                res.status(404).send('The cart with Id: ' + req.params.id_prod + ' does not on this cart')
            }
            carts.splice(objId, 1);
            res.status(201).send('The cart with Id: ' + req.params.id + ' was deleted successfully')
        } else {
            console.log('The cart with Id: ' + req.params.id + ' does not exists')
            //answer 404 : Not found
            res.status(404).send('The cart with Id: ' + req.params.id + ' does not exists')
        }
    });

export default router;
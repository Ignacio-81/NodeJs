import { Router } from 'express';
import { products, productsRepo } from "../../src/server.js"

const router = Router();
//Variable to configure Admin block .
const admin = false

const checkAdmin = (req, res, next) => {
    if (admin) {
        next()
    } else {
        res.json({ error: -1, description: `route ${req.path} of method ${req.method} not authorized` })
    }
}

router.get('/:id?', (req, res) => {
    if ((products.length == 0) || (products == "[]")) {
        //answer 404 : Not found
        res.status(404).send("Product Not Found");
    }
    if (req.params.id) {
        const obj = products.find((products) => products.id === parseInt(req.params.id))
        if (obj) {
            res.status(200).json(obj);
        } else {
            console.log('The product with Id: ' + req.params.id + ' does not exists')
            //answer 404 : Not found
            res.status(404).send('The product with Id: ' + req.params.id + ' does not exists')
        }
    } else {

        res.status(200).json(products);
    }

})

router.post("/", checkAdmin, (req, res) => {
    let id
    let newObj = req.body
    console.log(newObj);//Debugger Optional
    //Check if product has all the params.
    if (!newObj.name || !newObj.price || !newObj.code || !newObj.code) {
        res.status(400).send("You must send name, price and code ");
    } else {
        newObj.price = parseInt(newObj.price) //convert string number into number
        if (!products.length == 0) {
            id = products.length + 1
        } else {
            id = 1
        }
        let today = new Date();
        let date = today.toLocaleString()
        const newP = { 'id': id, ...newObj, 'timestamp': date }
        productsRepo.write(newP)
        products.push(newP)
        //return 201 created - send the product created
        res.status(201).json(products.find((products) => products.id === id))
    }
})
router.route("/:id")
    .put(checkAdmin, (req, res) => {
        const newObj = req.body
        if ((products.length == 0) || (products == "[]")) {
            res.status(400).send("There is no product on the server");
        }
        if (!newObj.name || !newObj.price) {
            res.status(400).send("You must send title, price");
        } else {
            //Find object inside the array with the id 
            let objId = products.findIndex((products) => products.id === parseInt(req.params.id))
            if (objId) {
                let today = new Date();
                let date = today.toLocaleString()
                products[objId] = { 'id': parseInt(req.params.id), ...newObj, 'timestamp': date }
                productsRepo.writeAll(products)
                //return 201 created - send the product updated
                res.status(201).json(products.find((products) => products.id === parseInt(req.params.id)))
            } else {
                console.log('The product with Id: ' + req.params.id + ' does not exists')
                //answer 404 : Not found
                res.status(404).send('The product with Id: ' + req.params.id + ' does not exists')
            }
        }


    })
    .delete(checkAdmin, (req, res) => {
        if ((products.length == 0) || (products == "[]")) {
            res.status(400).send("There is no product on the server");
        }
        //Find object inside the array with the id 
        const objId = products.findIndex((products) => products.id === parseInt(req.params.id))
        if (objId != -1) {
            products.splice(objId, 1);
            productsRepo.writeAll(products)
            res.status(201).send('The product with Id: ' + req.params.id + ' was deleted successfully')
        } else {
            console.log('The product with Id: ' + req.params.id + ' does not exists')
            //answer 404 : Not found
            res.status(404).send('The product with Id: ' + req.params.id + ' does not exists')
        }

    });

export default router;
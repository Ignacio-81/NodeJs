import {Router} from "express"

const router = Router();
const products = [
    { id: 1,
        title: 'Pc mouse', 
        price: 150, 
        thumbnail: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80' 
    },
    { id: 2,
        title: 'Monitor', 
        price: 3500, 
        thumbnail: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80' 
    },
    { id: 3, 
        title: 'Keyboard', 
        price: 550, 
        thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80' 
    }
]

router.route("/")
.get((req, res) => {
    if ((products.length == 0) || (products == "[]")){
        res.status(400).send("Product Not Found");
    }
    res.status(200).json(products)
})
.post((req,res)=>{
    let id 
    let newObj = req.body
    console.log(newObj);
    if (!newObj.title || !newObj.price || !newObj.thumbnail){
        res.status(400).send("You must send title, price and url");
    }else{  
        newObj.price = parseInt(newObj.price)
        if (!products.length == 0){
            id = products.length + 1
        }else{
            id = 1
        }
        products.push({'id': id , ...newObj})
        res.status(201).json(products.find((products) => products.id === id))
    }
})
router.route("/:id")
.get((req, res) => {
    
    if ((products.length == 0) || (products == "[]")){
        res.status(400).send("Product not found");
    }
    //Find object inside the array with the id 
    const objId = products.find((products) => products.id === parseInt(req.params.id))
    if (objId != -1){
        res.status(200).json(objId)
    }else {
        console.log('The product with Id: '+req.params.id+' does not exists')   
        res.status(400).send('The product with Id: '+req.params.id+' does not exists')
    }
})
.delete((req, res) => {
    
    if ((products.length == 0) || (products == "[]")){
        res.status(400).send("There is no product on the server");
    }
    //Find object inside the array with the id 
    const objId = products.findIndex((products) => products.id === parseInt(req.params.id))
    if (objId != -1){
        products.splice(objId, 1);
        res.status(201).send('The product with Id: '+req.params.id+' was deleted successfully')
    }else {
        console.log('The product with Id: '+req.params.id+' does not exists')   
        res.status(400).send('The product with Id: '+req.params.id+' does not exists')
    }
})

export default router;

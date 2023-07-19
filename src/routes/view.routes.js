import { Router } from "express";
import ProductManager from '../dao/productsManager.js'


const productService = new ProductManager("products.json")

const router = Router()



//Server http
router.get("/", async(req, res) =>{
    try {
        const products = await productService.getProducts()

        res.render("home", {
            products: products,
            style: "home.css"
        })
    }
    catch (error) {
        res.send({status:"error", message: error.message})
    }
})



//Server socket
router.get("/realtimeproducts", async(req, res) =>{
    try {
        res.render("realTimeProducts", {
            style: "realTimeProducts.css"
        })
    }
    catch (error) {
        res.send({status: "error", message: error.message})
    }
})



export { router as viewRouters }
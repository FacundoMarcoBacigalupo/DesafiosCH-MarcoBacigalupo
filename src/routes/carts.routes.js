import { Router } from 'express'

import { cartService } from "../dao/servicesMongo.js"
import { productService } from "../dao/servicesMongo.js"


const router = Router()



router.post("/", async(req, res) =>{
    try {
        const cartCreate = await cartService.addCart()
        res.send({status: "success", data: cartCreate, message: "Cart created"})
    }
    catch (error) {
        res.send({status: "error", message: error.message})
    }
})




router.post("/:cid/product/:pid", async(req, res) =>{
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)

        const cart = await cartService.getCartById(cartId)
        const product = await productService.getProductById(productId)


        const productCart = cart.product
        const productInCart = productCart.find( (cartProduct) => cartProduct.product === productId)

        if(productInCart){
            productInCart.quantity++
        }
        else{
            const newProduct = {
                product: productId,
                quantity: 1
            }
            cart.product.push(newProduct)
        }

        const request = await cartService.updateCart(cartId, cart)
        res.send({status:"success", data: request})
    }
    catch (error) {
        res.send({status: "error", message: error.message})
    }
})



router.get("/:cid", async(req, res) =>{
    try {
        let cId = parseInt(req.params.cid)
        let cart = await cartService.getCartById(cId)
        if(!cart){
            res.send({status: "error", data: "Cart no exist"})
        }

        res.send({status: "success", data: cart})
    }
    catch (error) {
        res.send({status: "error", message: error.message})
    }
})



router.get("/populate/:cid", async(req, res) =>{
    try {
        let cId = parseInt(req.params.cid)
        let cart = await cartService.getCartById(cId).populate("product")
        if(!cart){
            res.send({status: "error", data: "Cart no exist"})
        }

        res.send({status: "success", data: cart})
    }
    catch (error) {
        res.send({status: "error", message: error.message})
    }
})



router.delete("/:cid/products/:pid", async(req, res) =>{
    try {
        let cartId = parseInt(req.params.cid)
        let productId = parseInt(req.params.pid)

        let cart = await cartService.getCartById(cartId)
        if(!cart){
            return res.send({status: "error", message: "Cart no found"})
        }

        let product = await productService.getProductById(productId)
        if(!product){
            return res.send({status: "error", message: "Product no found"})
        }

        cart.deleteOne()
        cart.save()
        res.send({status: "success", message: "Product deleted"})
    }
    catch (error) {
        res.send({status: "error", message: error.message})
    }
})



router.delete("/:cid", async(req, res) =>{
    try {
        let cartId = parseInt(req.params.cid)
        let cart = await cartService.getCartById(cartId)
        if(!cart){
            return res.send({status: "error", message: "Cart no found"})
        }

        await cartService.deleteProduct(cartId)

        res.send({status: "success", message: "Product deleted"})
    }
    catch (error) {
        res.send({status: "error", message: error.message})
    }
})



router.put("/:cid", async(req, res) =>{
    try {
        let cartId = parseInt(req.params.cid)
        let cartContent = req.body
        
        let cart = await cartService.getCartById(cartId)
        if(!cart){
            return res.send({status: "error", message: "Cart no found"})
        }

        cart.product.push(cartContent)
        cart.save()
        res.send({status: "success", data: "Cart updated"})
    }
    catch (error) {
        res.send({status: "error", message: error.message})
    }
})


router.put("/:cid/products/:pid", async(req, res) =>{
    try {
        let cartId = parseInt(req.params.cid)
        let productId = parseInt(req.params.pid)

        let cart = await cartService.getCartById(cartId)
        if(!cart){
            return res.send({status: "error", message: "Cart no found"})
        }

        let product = await productService.getProductById(productId)
        if(!product){
            return res.send({status: "error", message: "Product no found"})
        }

        cart.product.push(productId)
        let result = await cartService.updateCart(cartId, cart)
        res.send({status: "success", data: result, message: "Product updated"})
    }
    catch (error) {
        res.send({status: "error", message: error.message})
    }
})



export { router as cartsRouter }
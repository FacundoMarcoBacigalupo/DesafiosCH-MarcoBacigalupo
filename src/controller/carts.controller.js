import { CartsService } from "../service/carts.service.js"
import { ProductService } from '../service/products.service.js'



export class CartsController{
    static createCart = async(req, res) =>{
        try {
            const cartCreate = await CartsService.createCart()
            res.send({status: "success", data: cartCreate, message: "Cart created"})
        }
        catch (error) {
            res.send({status: "error", message: error.message})
        }
    }


    static getProductInCartById = async(req, res) =>{
        try {
            const cartId = parseInt(req.params.cid)
            const productId = parseInt(req.params.pid)
    
            const cart = await CartsService.getCartById(cartId)
            const product = await ProductService.getProductById(pid)
    
    
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

            const request = await CartsService.updateCart(cartId, cart)
            res.send({status:"success", data: request})
        }
        catch (error) {
            res.send({status: "error", message: error.message})
        }
    }


    static getCartById = async(req, res) =>{
        try {
            let cId = parseInt(req.params.cid)
            let cart = await CartsService.getCartById(cId)
            if(!cart){
                res.send({status: "error", data: "Cart no exist"})
            }

            res.send({status: "success", data: cart})
        }
        catch (error) {
            res.send({status: "error", message: error.message})
        }
    }


    static getCartWithPopulate = async(req, res) =>{
        try {
            let cId = parseInt(req.params.cid)
            let cart = await CartsService.getCartById(cId).populate("product")
            if(!cart){
                res.send({status: "error", data: "Cart no exist"})
            }

            res.send({status: "success", data: cart})
        }
        catch (error) {
            res.send({status: "error", message: error.message})
        }
    }


    static deleteProductInCartById = async(req, res) =>{
        try {
            let cartId = parseInt(req.params.cid)
            let productId = parseInt(req.params.pid)
    
            let cart = await CartsService.getCartById(cartId)
            if(!cart){
                return res.send({status: "error", message: "Cart no found"})
            }

            let product = await ProductService.getProductById(productId)
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
    }


    static deleteCartById = async(req, res) =>{
        try {
            let cartId = parseInt(req.params.cid)
            let cart = await CartsService.getCartById(cartId)
            if(!cart){
                return res.send({status: "error", message: "Cart no found"})
            }

            await CartsService.deleteProduct(cartId)

            res.send({status: "success", message: "Product deleted"})
        }
        catch (error) {
            res.send({status: "error", message: error.message})
        }
    }


    static updateCartById = async(req, res) =>{
        try {
            let cartId = parseInt(req.params.cid)
            let cartContent = req.body
            
            let cart = await CartsService.getCartById(cartId)
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
    }


    static updateProductInCartById = async(req, res) =>{
        try {
            let cartId = parseInt(req.params.cid)
            let productId = parseInt(req.params.pid)

            let cart = await CartsService.getCartById(cartId)
            if(!cart){
                return res.send({status: "error", message: "Cart no found"})
            }

            let product = await ProductService.getProductById(productId)
            if(!product){
                return res.send({status: "error", message: "Product no found"})
            }

            cart.product.push(productId)
            let result = await CartsService.updateCart(cartId, cart)
            res.send({status: "success", data: result, message: "Product updated"})
        }
        catch (error) {
            res.send({status: "error", message: error.message})
        }
    }
}
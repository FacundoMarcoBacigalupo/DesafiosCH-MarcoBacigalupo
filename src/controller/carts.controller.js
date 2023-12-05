import { CartsService } from "../service/carts.service.js"
import { ProductService } from '../service/products.service.js'



export class CartsController{
    static createCart = async(req, res) =>{
        try {
            const cartCreate = await CartsService.createCart()
            res.send({status: "Success", data: cartCreate, message: "Cart created"})
        }
        catch (error) {
            console.log(error.message)
            res.send({status: "Error", message: error.message})
        }
    }


    static getProductInCartById = async(req, res) =>{
        try {
            const cartId = parseInt(req.params.cid)
            const productId = parseInt(req.params.pid)
    
            const cart = await CartsService.getCartById(cartId)
            const product = await ProductService.getProductById(pid)
    
    
            const productCart = cart.product
            const productInCart = productCart.find( (cartProduct) => cartProduct.productId === productId)

            if(productInCart){
                productInCart.quantity++
            }
            else{
                const newProduct = {
                    productId: productId,
                    quantity: 1
                }
                cart.product.push(newProduct)
            }

            const request = await CartsService.updateCart(cartId, cart)
            res.send({status:"Success", data: request})
        }
        catch (error) {
            console.log(error.message)
            res.send({status:"Error", message: error.message})
        }
    }


    static getCartById = async(req, res) =>{
        try {
            let cartId = req.params.cid
            let cart = await CartsService.getCartById(cartId)
            if(!cart){
                res.send({status:"Error", data: "Cart no exist"})
            }

            res.send({status:"Success", data: cart})
        }
        catch (error) {
            console.log(error.message)
            res.send({status:"Error", message: error.message})
        }
    }


    static getCartWithPopulate = async(req, res) =>{
        try {
            let cId = parseInt(req.params.cid)
            let cart = await CartsService.getCartById(cId).populate("product")
            if(!cart){
                res.send({status:"Error", data: "Cart no exist"})
            }

            res.send({status:"Success", data: cart})
        }
        catch (error) {
            console.log(error.message)
            res.send({status:"Error", message: error.message})
        }
    }


    static deleteProductInCartById = async(req, res) =>{
        try {
            let cartId = parseInt(req.params.cid)
            let productId = parseInt(req.params.pid)
    
            let cart = await CartsService.getCartById(cartId)
            if(!cart){
                return res.send({status:"Error", message:"Cart no found"})
            }

            let product = await ProductService.getProductById(productId)
            if(!product){
                return res.send({status:"Error", message:"Product no found"})
            }

            cart.deleteOne()
            cart.save()
            res.send({status:"Success", message:"Product deleted"})
        }
        catch (error) {
            console.log(error.message)
            res.send({status:"Error", message: error.message})
        }
    }


    static deleteCartById = async(req, res) =>{
        try {
            let cartId = parseInt(req.params.cid)
            let cart = await CartsService.getCartById(cartId)
            if(!cart){
                return res.send({status:"Error", message:"Cart no found"})
            }

            await CartsService.deleteCart(cartId)

            res.send({status:"Success", message:"Product deleted"})
        }
        catch (error) {
            console.log(error.message)
            res.send({status:"Error", message:error.message})
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
            res.send({status:"Success", data: "Cart updated"})
        }
        catch (error) {
            console.log(error.message)
            res.send({status:"Error", message: error.message})
        }
    }


    static updateProductInCartById = async(req, res) =>{
        try {
            let cartId = req.params.cid
            let productId = req.params.pid

            let cart = await CartsService.getCartById(cartId)
            if(!cart){
                return res.send({status: "Error", message: "Cart no found"})
            }
            let product = await ProductService.getProductById(productId)
            if(!product){
                return res.send({status: "Error", message: "Product in cart not found"})
            }

            if(cart.products.find(product => product.id === productId)){
                cart.products.type.quantity + 1

                let result = await CartsService.updateCart(cartId, cart)
                res.send({status: "Success", data: result, message: "Product in cart updated"})
            }
            else{
                const newProduct = {
                    productId:productId,
                    quantity:1
                }
                cart.products.push(newProduct)

                let result = await CartsService.updateCart(cartId, cart)
                res.send({status: "Success", data: result, message: "Product in cart updated"})
            }
        }
        catch (error) {
            console.log(error.message)
            res.send({status: "Error", message: error.message})
        }
    }
}
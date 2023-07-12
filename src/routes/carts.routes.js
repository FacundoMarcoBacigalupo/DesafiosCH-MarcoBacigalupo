import { Router } from 'express'
import CartManager from '../dao/cartsManager.js'
import ProductManager from '../dao/productsManager.js'


const cartService = new CartManager("carts.json")
const productService = new ProductManager("products.json")

const router = Router()


router.post("/", async(req, res) =>{
    try {
        const cartCreate = await cartService.addCart()
        res.json({status: "success", data: cartCreate, message: "Cart created"})
    }
    catch (error) {
        res.json({status: "error", message: error.message})
    }
})



router.get("/:cid", async(req, res) =>{
    try {
        const cId = parseInt(req.params.cid)
        const cart = await cartService.getProductById(cId)
        res.json({status: "success", data: cart})
    }
    catch (error) {
        res.json({status: "error", message: error.message})
    }
})


router.post("/:cid/product/:pid", async(req, res) =>{
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)

        const cart = await cartService.getProductById(cartId)
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

        const request = await cartService.updateProduct(cartId, cart)
        res.json({status:"success", data: request})
    }
    catch (error) {
        res.json({status: "error", message: error.message})
    }
})


export { router as cartsRouter }
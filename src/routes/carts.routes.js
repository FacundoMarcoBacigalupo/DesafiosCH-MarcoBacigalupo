import { Router } from 'express'
import { CartsController } from '../controller/carts.controller.js'


const router = Router()


//Create Cart
router.post("/", CartsController.createCart)


//Get product in cart
router.post("/:cid/product/:pid", CartsController.getProductInCartById)


//Get cart by id
router.get("/:cid", CartsController.getCartById)


//Get cart with populate
router.get("/populate/:cid", CartsController.getCartWithPopulate)


//Delete product in cart
router.delete("/:cid/products/:pid", CartsController.deleteProductInCartById)


//Delete cart by id
router.delete("/:cid", CartsController.deleteCartById)


//Update cart by id
router.put("/:cid", CartsController.updateCartById)


//Update product in cart
router.put("/:cid/products/:pid", CartsController.updateProductInCartById)



export { router as cartsRouter }
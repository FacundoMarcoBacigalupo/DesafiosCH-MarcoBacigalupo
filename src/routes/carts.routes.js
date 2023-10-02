import { Router } from 'express'
import { CartsController } from '../controller/carts.controller.js'
import { checkRole, checkUserAuthenticate } from '../dao/middlewares/auth.js'


const router = Router()



//Get cart by id
router.get("/:cid", CartsController.getCartById)


//Get cart with populate
router.get("/populate/:cid", CartsController.getCartWithPopulate)


//Create Cart
router.post("/", checkUserAuthenticate, checkRole(["admin"]), CartsController.createCart)


//Get product in cart
router.post("/:cid/product/:pid", checkUserAuthenticate, checkRole(["admin"]), CartsController.getProductInCartById)


//Delete product in cart
router.delete("/:cid/products/:pid", checkUserAuthenticate, checkRole(["admin"]), CartsController.deleteProductInCartById)


//Delete cart by id
router.delete("/:cid", checkUserAuthenticate, checkRole(["admin"]), CartsController.deleteCartById)


//Update cart by id
router.put("/:cid", checkUserAuthenticate, checkRole(["admin"]), CartsController.updateCartById)


//Update product in cart
router.put("/:cid/products/:pid", checkUserAuthenticate, checkRole(["admin"]), CartsController.updateProductInCartById)




export { router as cartsRouter }
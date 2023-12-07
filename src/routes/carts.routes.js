import { Router } from 'express';
import { CartsController } from '../controller/carts.controller.js';
import { checkRole, checkUserAuthenticate } from '../dao/middlewares/auth.js';
import { TicketsController } from '../controller/tickets.controller.js';


const router = Router();


//Get cart by id
router.get("/:cid", CartsController.getCartById);


//Get cart with populate
router.get("/populate/:cid", CartsController.getCartWithPopulate);


//Get product in cart
router.get("/:cid/product/:pid", checkUserAuthenticate, checkRole(["admin", "premium"]), CartsController.getProductInCartById);


//Create Cart
router.post("/:pid", checkUserAuthenticate, checkRole(["admin", "premium"]), CartsController.createCart);

//Create ticket for cart
router.post("/:cid/purchase", TicketsController.createTicket);


//Update cart by id
router.put("/:cid", checkUserAuthenticate, checkRole(["admin", "premium"]), CartsController.updateCartById);


//Update product in cart
router.put("/:cid/products/:pid", checkUserAuthenticate, checkRole(["admin", "premium"]), CartsController.updateProductInCartById);



export { router as cartsRouter };
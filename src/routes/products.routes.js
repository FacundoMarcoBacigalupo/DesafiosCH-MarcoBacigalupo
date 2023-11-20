import { Router } from 'express'
import { ProductsController } from '../controller/products.controller.js'
import { checkRole, checkUserAuthenticate } from '../dao/middlewares/auth.js'
import { uploaderProducts } from "../utils.js"

const router = Router()


//Get products
router.get("/", ProductsController.getProducts)


//Get products by ID
router.get("/:pid", ProductsController.getProductsById)


//Post products
router.post("/", checkUserAuthenticate, checkRole(["admin", "premium"]), uploaderProducts.single("thumbnail"), ProductsController.createProduct)


//Update products by ID
router.put("/:pid", checkUserAuthenticate, checkRole(["admin", "premium"]), ProductsController.updateProduct)


//Delete products by ID
router.delete("/:pid", checkUserAuthenticate, checkRole(["admin", "premium"]), ProductsController.deleteProduct)



export { router as productsRouter }
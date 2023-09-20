import { Router } from 'express'
import { ProductsController } from '../controller/products.controller.js'

const router = Router()



//Get products
router.get("/", ProductsController.getProducts)


//Get products by ID
router.get("/:pid", ProductsController.getProductsById)


//Post products
router.post("/", ProductsController.createProduct)


//Update products by ID
router.put("/:pid", ProductsController.updateProduct)


//Delete products by ID
router.delete("/:pid", ProductsController.deleteProduct)


export { router as productsRouter }
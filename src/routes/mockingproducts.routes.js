import { Router } from "express";
import { MockingProducts } from '../controller/mockingproducts.controller.js'

const router = Router()


router.get("/", MockingProducts.createProducts)


export{ router as mockingproducts }
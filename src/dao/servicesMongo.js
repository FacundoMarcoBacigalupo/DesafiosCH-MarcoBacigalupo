import { CartsMongo } from "./managers/mongo/cartsMongo.js"
import { ProductsMongo } from "./managers/mongo/productsMongo.js"


export const cartService = new CartsMongo()
export const productService = new ProductsMongo()
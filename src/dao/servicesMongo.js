import { CartsMongo } from "./managers/mongo/cartsMongo.js"
import { ProductsMongo } from "./managers/mongo/productsMongo.js"
import { UsersMongo } from "./managers/mongo/usersMongo.js"


export const cartService = new CartsMongo()

export const productService = new ProductsMongo()

export const usersService = new UsersMongo()
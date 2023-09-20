import { CartsMongo } from "./managers/mongo/cartsMongo.js"
import { ProductsMongo } from "./managers/mongo/productsMongo.js"
import { UsersMongo } from "./managers/mongo/usersMongo.js"


export const cartDao = new CartsMongo()

export const productDao = new ProductsMongo()

export const usersDao = new UsersMongo()
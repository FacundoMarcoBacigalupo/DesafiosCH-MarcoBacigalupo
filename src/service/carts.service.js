import { cartDao } from "../dao/servicesMongo"


export class CartsService{
    static createCart = async() =>{
        return await cartDao.addCart()
    }


    static getCartById = async(cartId) =>{
        return await cartDao.getCartById(cartId)
    }


    static updateCart = async(cartId, cart) =>{
        return await cartDao.updateCart(cartId, cart)
    }


    static deleteProduct = async(cartId) =>{
        return await cartDao.deleteProduct(cartId)
    }
}
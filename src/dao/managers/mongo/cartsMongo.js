import { cartsModel } from '../../models/carts.model.js'

export class CartsMongo{
    constructor(){
        this.model= cartsModel
    }


//Agregar productos al carrito
async addCart() {
    try {
        const cartCreated = await this.model.create({})
        return cartCreated
    }
    catch (error) {
        console.log(error.message)
        throw new Error("Error with created the product")
    }
}



//Actualizar productos
async updateCart (id, updateCamp) {
    try {
        const updateCart = await this.model.findByIdAndUpdate(id, updateCamp, {new:true})
        if(!updateCart){
            throw new Error("Product not exist")
        }
        return updateCart
    }
    catch (error) {
        console.log(error.message)
        throw new Error("Error with get products")
    }
}



//Obtener todos los productos
    async getCart() {
        try {
            const products = await this.model.find()
            return products
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get products")
        }
    }



//Obtener un carrito por Id
    async getCartById(id) {
        try {
            const productId = await this.model.findById(id).lean()
            return productId
        } 
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get product with that Id")
        }
    }



//Eliminar un product
    async deleteCart(id) {
        try {
            const product = this.getCartById(id)
            if(product){
                await this.model.findByIdAndDelete(id)
                return "Cart deleted"
            }
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with delete product")
        }
    }




//Obtener con paginas
    async getCartsPaginate (query, options){
        try {
            const result = await this.model.paginate(query, options)
            return result
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get products in cart")
        }
    }
}
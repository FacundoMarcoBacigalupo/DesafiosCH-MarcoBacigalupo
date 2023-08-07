import { cartsModel } from '../../models/carts.model.js'


export class CartsMongo{
    constructor(){
        this.model= cartsModel
    }


//Agregar productos al carrito
async addCart (){
    try {
        const createdProduct = await this.model.find()
        return createdProduct
    }
    catch (error) {
        console.log(error.message)
        throw new Error("Error with created the product")
    }
}



//Actualizar productos
async updateProduct (id, updateCamp){
    try {
        const productId = await this.model.findById(_id = id)
        const updateProduct = await this.model.create(productId)
        return updateProduct
    }
    catch (error) {
        console.log(error.message)
        throw new Error("Error with get products")
    }
}



//Obtener todos los productos
    async getProducts (){
        try {
            const products = await this.model.find()
            return products
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get products")
        }
    }



//Obtener un producto por Id
    async getProductById(id){
        try {
            const productId = await this.model.findById(_id = id)
            return productId
        } 
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get product with that Id")
        }
    }



//Eliminar un producto
    async deleteProduct(id){
        try {
            const deletedProduct = await this.model.deleteOne(_id = id)
            return deletedProduct
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with delete product")
        }
    }
}
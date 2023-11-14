import { productsModel } from '../../models/products.model.js'


export class ProductsMongo{
    constructor(){
        this.model= productsModel
    }


//Crear productos
async createProduct (productInfo){
    try {
        const createdProduct = await this.model.create(productInfo)
        return createdProduct
    }
    catch (error) {
        console.log(error.message)
        throw new Error("Error with created the product")
    }
}



//Obtener todos los productos
    async getProducts (){
        try {
            const products = await this.model.find().lean()
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
            const productId = await this.model.findById(id).lean()
            return productId
        } 
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get product with that Id")
        }
    }




//Actualizar un producto
async updateProduct(id, updateCamp) {
    try {
        const updateProduct = await this.model.findByIdAndUpdate(id, updateCamp, {new:true})
        if(!updateProduct){
            throw new Error("Product not exist")
        }
        return updateProduct
    }
    catch (error) {
        console.log(error.message)
        throw new Error("Error with get products")
    }
}



//Eliminar un producto
    async deleteProduct(id){
        try {
            const product = this.getProductById(id)
            if(product){
                await this.model.findByIdAndDelete(id)
                return "Product deleted"
            }
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with delete product")
        }
    }




//Obtener con paginas
    async getProductsPaginate (query, options){
        try {
            const result = await this.model.paginate(query, options)
            return result
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get products")
        }
    }
}
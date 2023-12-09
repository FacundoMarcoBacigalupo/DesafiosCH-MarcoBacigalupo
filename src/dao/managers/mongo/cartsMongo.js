import { cartsModel } from '../../models/carts.model.js'

export class CartsMongo{
    constructor(){
        this.model= cartsModel
    }


//Add products to cart
    async createCart(quant, pId) {
        try {
            const cartCreated = await this.model.create({
                products:[
                    {
                        quantity:quant,
                        productId:pId
                    }
                ]
            })
            return cartCreated
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with created the cart")
        }
    }



//Actualizar productos
    async updateCart (id, updateCamp) {
        try {
            const updateCart = await this.model.findByIdAndUpdate(id, updateCamp, {new:true})
            if(!updateCart){
                throw new Error("Cart not exist")
            };
            return updateCart;
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get products")
        }
    }



//Get all Carts
    async getCart() {
        try {
            const carts = await this.model.find().lean()
            return carts
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get the carts")
        }
    }



//Get cart by Id
    async getCartById(id) {
        try {
            const cart = await this.model.findById(id);
            if(!cart){
                throw new Error("The cart not found")
            };
            return cart;
        } 
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get cart with that Id")
        }
    }



//Delete cart by id
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




//Get cart with paginate
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
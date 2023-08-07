import mongoose from "mongoose";


const productCollection = "products"


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },

    description:String,

    code: String,

    price:{
        type:Number,
        required: true
    },

    status:String,

    stock:{
        type:Number,
        required: true
    },

    category:{
        type:String,
        required: true
    },

    thumbnail:String
})



export const productsModel = mongoose.model(productCollection, productSchema)
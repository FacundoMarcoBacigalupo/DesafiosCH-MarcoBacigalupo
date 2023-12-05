import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { productCollection } from '../../config/constants/constants.js'


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
        required: true,
        default:0
    },

    category:{
        type:String,
        required: true,
        enum:["Shoes", "Clothes"]
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },

    thumbnail:{
        type:String,
        require:true
    }
})


productSchema.plugin(mongoosePaginate)


export const productsModel = mongoose.model(productCollection, productSchema)
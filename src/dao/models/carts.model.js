import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { productCollection } from "../../config/constants/constants.js"
import { cartsCollection } from '../../config/constants/constants.js'


const cartsSchema = new mongoose.Schema({
    product:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:productCollection
            }
        ],

        default:[]
    }
})


cartsSchema.plugin(mongoosePaginate)


export const cartsModel = mongoose.model(cartsCollection, cartsSchema)
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { productCollection } from "../../config/constants/constants.js"
import { cartsCollection } from '../../config/constants/constants.js'


const cartsSchema = new mongoose.Schema({
    products:{
        type:[
            {
                quantity:{
                    type:Number,
                    default:1
                },
                productId:{
                    type:mongoose.Types.ObjectId,
                    ref:productCollection
                }
            }
        ],
        default:[]
    }
})


cartsSchema.plugin(mongoosePaginate)


export const cartsModel = mongoose.model(cartsCollection, cartsSchema)
import mongoose from "mongoose";
import { usersCollection } from '../../config/constants/constants.js'


const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },

    last_name:{
        type:String
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    age:{
        type:Number
    },

    password:{
        type:String,
        required:true,
    },

    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts"
    },

    role:{
        type:String,
        require:true,
        enum:["user","admin", "premium"],
        default:"user"
    },

    documents:{
        type:[
            {
                name:{
                    type:String,
                    required:true
                },
                reference:{
                    type:String,
                    required:true
                }
            }
        ],
        default:[]
    },

    last_connection:{
        type:Date,
        default:null
    },

    status:{
        type:String,
        enums:["pending", "incomplete", "complete"],
        default:"pending"
    },

    profile:{
        type:String,
        require:true
    }
})


export const usersModel = mongoose.model(usersCollection, userSchema)
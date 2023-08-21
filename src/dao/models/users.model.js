import mongoose from "mongoose";

import { usersCollection } from '../../constants/constants.js'

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

    role:{
        type:String,
        default:"user"
    }
})

export const usersModel = mongoose.model(usersCollection, userSchema)
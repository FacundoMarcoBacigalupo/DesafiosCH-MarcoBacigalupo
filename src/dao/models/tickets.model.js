import mongoose from "mongoose";
import { ticketsCollection } from '../../config/constants/constants.js'


const ticketsSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true
    },

    purchase_datetime: Date,

    amount:{
        type: Number,
        required: true
    },

    purchaser: String
})


export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema)
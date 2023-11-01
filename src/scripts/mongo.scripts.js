import mongoose from "mongoose"
import { productsModel } from "../dao/models/products.model.js"
import { config } from "../config/config.js"



const addOwnerToProducts = async() =>{
    try{
        await mongoose.connect(config.mongo.url)
        console.log("Data base connected")
        const adminId = "poner el id del usuairo"
        const result = await productsModel.updateMany({},{$set:{owner:adminId}})
        console.log(result)
    }
    catch (error){
        console.log(error.message)
    }
    finally{
        await mongoose.connection.close()
    }
}

addOwnerToProducts()
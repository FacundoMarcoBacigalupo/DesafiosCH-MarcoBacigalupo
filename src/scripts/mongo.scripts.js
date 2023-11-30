import mongoose from "mongoose"
import { productsModel } from "../dao/models/products.model.js"
import { usersModel } from '../dao/models/users.model.js';
import { config } from "../config/config.js"




//Script to add the propiety "owner" to product
const addOwnerToProducts = async() =>{
    try{
        await mongoose.connect(config.mongo.url)
        console.log("Data base connected")
        const adminId = "Put the user ID"
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




//Script to delete all user in data basa
const deleteAllUser = async() =>{
    try {
        await mongoose.connect(config.mongo.url)
        console.log("Data base connected")
        const result = await usersModel.deleteMany({})
        console.log(result)
    }
    catch (error) {
        console.log(error.message)
    }
}
deleteAllUser()
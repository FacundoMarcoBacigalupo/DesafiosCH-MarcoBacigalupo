import dotenv from "dotenv";
import path from "path"
import { __dirname } from "../utils.js"



let environment = "PRODUCTION" 

dotenv.config({
    path: environment === "DEVELOPMENT" ? path.join(__dirname,"../.env.development") : path.join(__dirname,"../.env.production")
});


export const config = {
    server:{
        port: process.env.PORT || 8080,
        secretSession: process.env.SECRET_SESSION || "clavDevelopmentSecret",
        persistense: process.env.PERSISTENSE
    },
    mongo:{
        url: process.env.MONGO_URL || "mongodb+srv://Facundo:Metalero120@cluster0.lxndxty.mongodb.net/developmentDB?retryWrites=true&w=majority",
    },
    github:{
        clientId: process.env.CLIENT_ID,
        clienteSecret: process.env.CLIENTE_SECRET,
        callBackUrl: process.env.CALL_BACK_URL
    }
}
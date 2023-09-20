import dotenv from "dotenv";
import path from "path"
import { __dirname } from "../utils.js"


const environment = "PRODUCTION" 

dotenv.config({
    path:environment === "development" ? path.join(__dirname,"../.env.development") : path.join(__dirname,"../.env.production")
});


export const config = {
    server:{
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION,
    },
    mongo:{
        url: process.env.MONGO_URL,
    },
    github:{
        clientId: process.env.CLIENT_ID,
        clienteSecret: process.env.CLIENTE_SECRET,
        callBackUrl: process.env.CALL_BACK_URL
    }
}
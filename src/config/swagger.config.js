import swaggerJSDoc from "swagger-jsdoc";
import path from "path"
import { __dirname } from "../utils.js"



const swaggerOptions = {
    definition:{
        openapi:"3.1.0",
        info:{
            title:"Ecommerce API Documentation",
            version:"1.0.0",
            description:"Enpoits definition of the ecommerce API"
        }
    },
    apis:[`${path.join(__dirname,"/docs/**/*.yaml")}`]
}


export const swaggerSpecs = swaggerJSDoc(swaggerOptions)
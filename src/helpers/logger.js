import winston from "winston";
import dotenv from "dotenv";
import { config } from '../config/config.js'

dotenv.config();


const current = config.logger.current



const devLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({ level:"verbose" })
    ]
});

const prodLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({ level:"http" }),
        new winston.transports.File({ filename:"./src/logs/errors.log", level:"warn" })
    ]
});



export const addLogger = () =>{
    let logger = null;

    if(current === "development"){
        logger = devLogger
    }
    else{
        logger = prodLogger
    }
};
import nodemailer from "nodemailer"
import { config } from "./config.js"



const gmailTrasnporter = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
        user: config.gmail.gmailName,
        pass: config.gmail.gmailPassword
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
})


export { gmailTrasnporter }
import jwt from "jsonwebtoken"
import { config } from "../config/config.js"
import { gmailTrasnporter } from "../config/gmail.config.js"



export const generateEmailWithToken = (email, expiredEmail) =>{
    const token = jwt.sign({email}, config.gmail.gmailSecretToken, {expiresIn:expiredEmail})
    return token
}


export const emailRecovery = async(req, email, emailToken) =>{
    try {
        const domain = `${req.protocol}://${req.get("host")}`;
        const link = `${domain}/reset-password?token=${emailToken}`;

        gmailTrasnporter.sendMail({
            from: "Ecommerce Facu Backend",
            to: email,
            subjec: "Restore password",
            html: `
                <h1>Restore your password</h1>
                <p>Click in this link: <a href=${link}>Restore password</a></p>
            `
        });
    }
    catch (error) {
        console.log(error.message);
    }
}



export const emailRecoveryProductDeleted = async(req, email, emailToken) =>{
    try {
        const domain = `${req.protocol}://${req.get("host")}`;
        const link = `${domain}/login`;

        gmailTrasnporter.sendMail({
            from: "Ecommerce Facu Backend",
            to: email,
            subjec: "Your product in the Ecommerce Facu Backend be deleted",
            html: `
                <h1>Go to login</h1>
                <p>Click in this link: <a href=${link}>Login</a></p>
            `
        });
    }
    catch (error) {
        console.log(error.message);
    }
}




export const emailRecoveryAcountDeleted = async(req, email, emailToken) =>{
    try {
        const domain = `${req.protocol}://${req.get("host")}`;
        const link = `${domain}/register`;

        gmailTrasnporter.sendMail({
            from: "Ecommerce Facu Backend",
            to: email,
            subjec: "Your account has been deleted due to interaction time Ecommerce Facu Backend",
            html: `
                <h1>Go to register</h1>
                <p>Click in this link: <a href=${link}>Register</a></p>
            `
        });
    }
    catch (error) {
        console.log(error.message);
    }
}
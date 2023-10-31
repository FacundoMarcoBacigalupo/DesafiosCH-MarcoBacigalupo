import jwt from "jsonwebtoken"
import { config } from "../config/config.js"
import { gmailTrasnporter } from "../config/gmail.config.js"



export const generateEmailWithToken = (email, expiredEmail) =>{
    const token = jwt.sign({email}, config.gmail.gmailSecretToken, {expiresIn:expiredEmail})
    return token
}


export const emailRecovery = async(req, email, emailToken) =>{
    try {
        const domain = `${req.protocol}://${req.get("host")}`
        const link = `${domain}/reset-password?token=${emailToken}`

        await gmailTrasnporter.sendMail({
            from:"Ecommerce Facu Backend",
            to:email,
            subjec:"Restore password",
            html:`
                <h1>Restore your password</h1>
                <p>Click in this link: <a href=${link}>Restore password</a></p>
            `
        })
    } catch (error) {
        console.log(error.message)
    }
}
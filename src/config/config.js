import dotenv from "dotenv";
dotenv.config();


export const config = {
    server:{
        port: process.env.PORT || 8080,
        secretSession: process.env.SECRET_SESSION || "clavDevelopmentSecret",
        persistense: process.env.PERSISTENSE || "MONGO"
    },
    mongo:{
        url: process.env.MONGO_URL || "mongodb+srv://Facundo:Metalero120@cluster0.lxndxty.mongodb.net/developmentDB?retryWrites=true&w=majority"
    },
    github:{
        clientId: process.env.CLIENT_ID,
        clienteSecret: process.env.CLIENTE_SECRET,
        callBackUrl: process.env.CALL_BACK_URL
    },
    logger:{
        current: process.env.LOGGER
    },
    gmail:{
        gmailPassword: process.env.GMAIL_PASSWORD,
        gmailName: process.env.GMAIL_NAME,
        gmailSecretToken: process.env.GMAIL_SECRET_TOKEN
    }
};
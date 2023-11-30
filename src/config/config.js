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
        clientID: process.env.CLIENT_ID || "Iv1.4fcd41fa39808e5d",
        clientSecret: process.env.CLIENTE_SECRET || "e83a190c317d2ddbc41cd89f6ba98ce575416f81",
        callbackUrl: process.env.CALL_BACK_URL || "http://localhost:8080/api/sessions/githubcallback"
    },
    logger:{
        current: process.env.LOGGER
    },
    gmail:{
        gmailPassword: process.env.GMAIL_PASSWORD || "jqrb iuzu lnxt jrki",
        gmailName: process.env.GMAIL_NAME || "razorh130@gmail.com",
        gmailSecretToken: process.env.GMAIL_SECRET_TOKEN || "gmailSecretToken12acr"
    }
};
import multer from 'multer';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';
import jwt from "jsonwebtoken"
import { config } from './config/config.js';


export const __dirname = path.dirname(fileURLToPath(import.meta.url));



export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};



export const isValidPassword = (user, password) =>{
    return bcrypt.compareSync(password, user.password);
};



export const generateProducts = () =>{
    return{
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(2),
        code: faker.number.int({max: 10000}),
        price: faker.commerce.price({min: 20, max: 500, dec: 0, symbol: "$"}),
        status: faker.datatype.boolean({probability: 0.4}),
        stock: faker.number.int({max: 100}),
        category: faker.lorem.word(),
        thumbnail: faker.image.url()
    };
};



export const validateToken = async(token) =>{
    try {
        const info = jwt.verify(token, config.gmail.gmailSecretToken)
        return info.email
    } catch (error) {
        console.log("Error with the token",error.message)
        return null
    }
}



const checkValidFields = (body) =>{
    const { first_name, email, password } = body

    if(!first_name || !email || !password){
        return false
    }
    return true
}

const multerProfileFilter = (req, file, cb) =>{
    let valid = checkValidFields(req.body)

    if(valid === true){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}




const profileStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,"/multer/users/img"))
    },
    filename: function(req, file, cb){
        cb(null, `${req.body.email}-perfil-${file.originalname}`)
    }
})
export const uploaderProfile = multer({storage:profileStorage, fileFilter:multerProfileFilter})



const productsStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,"/multer/products/img"))
    },
    filename: function(req, file, cb){
        cb(null, `${req.body.code}-product-${file.originalname}`)
    }
})
export const uploaderProducts = multer({storage:productsStorage})



const documentsStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,"/multer/products/documents"))
    },
    filename: function(req, file, cb){
        cb(null, `${req.user.email}-document-${file.originalname}`)
    }
})
export const uploaderDocuments = multer({storage:documentsStorage})
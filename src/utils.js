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
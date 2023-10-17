import bcrypt from 'bcrypt'
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';



export const __dirname = path.dirname(fileURLToPath(import.meta.url));



export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}



export const isValidPassword = (userDB, password) =>{
    return bcrypt.compareSync(password, userDB.password)
}



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
    }
}
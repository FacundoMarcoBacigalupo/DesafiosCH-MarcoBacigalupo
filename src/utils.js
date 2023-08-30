import bcrypt from 'bcrypt'
import { dirname } from 'path';
import { fileURLToPath } from 'url';



export const __dirname = dirname(fileURLToPath(import.meta.url));


export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

export const isValidPassword = (userDB, password) =>{
    bcrypt.compareSync(password, userDB.password)
}
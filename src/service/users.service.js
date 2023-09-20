import { usersDao } from "../dao/servicesMongo"


export class UsersService{
    static getUserByEmail = async(email) =>{
        return await usersDao.getUserByEmail(email)
    }


    static createUser = async(newUser) =>{
        return await usersDao.createUser(newUser)
    }


    static getUserById = async(id) =>{
        return await usersDao.getUserById(id)
    }
}
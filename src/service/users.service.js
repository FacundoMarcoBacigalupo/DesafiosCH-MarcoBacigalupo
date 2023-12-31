import { usersDao } from "../dao/factory.js";

export class UsersService{
    static getUsers = async() =>{
        return await usersDao.getUsers()
    }


    static createUser = async(newUser) =>{
        return await usersDao.createUser(newUser)
    }


    static getUserByEmail = async(email) =>{
        return await usersDao.getUserByEmail(email)
    }


    static getUserById = async(id) =>{
        return await usersDao.getUserById(id)
    }


    static updateUser = async(userId, newUserInfo) =>{
        return await usersDao.updateUser(userId, newUserInfo)
    }


    static deleteUser = async(userId) =>{
        return await usersDao.deleteUser(userId)
    }
}
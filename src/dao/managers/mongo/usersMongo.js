import { usersModel } from '../../models/users.model.js'

export class UsersMongo{
    constructor() {
        this.model = usersModel
    }


    async createUser(user){
        try {
            const createUser = await this.model.create(user)
            return createUser
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with create user")
        }
    }


    async getUserByEmail(email){
        try {
            let userEmail = await this.model.findOne({email}).lean()
            if(userEmail){
                return userEmail
            }
            else{
                return null
            }
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get user with that email")
        }
    }


    async getUserById(userId){
        try {
            let user = await this.model.findById(userId).lean()
            if(user){
                return user
            }
            else{
                throw new Error("Error with get user with that ID")
            }
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get user with that ID")
        }
    }

    async updateUser(userId, newUserInfo){
        try {
            const userUpdated = await this.model.findByIdAndUpdate(userId, newUserInfo,{new:true})
            return userUpdated
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with create user")
        }
    }
}
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

    async getUserByEmail(userEmail){
        try {
            let usEmail = this.model.findOne({email: userEmail})
            if(usEmail){
                return usEmail
            }
            else{
                null
            }
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with get user with that email")
        }
    }


    async getUserById(userId){
        try {
            const user = this.model.findById(userId)
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
}
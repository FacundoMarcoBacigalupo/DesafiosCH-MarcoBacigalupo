import { UsersService } from "../service/users.service.js"
import { CustomError } from "../service/errors/CustomError.service.js";
import { generateUserErrorInfo } from "../service/errors/Info.service.js";
import { EErrors } from "../service/errors/Enums.service.js";
import { invalidParamMessage } from '../service/errors/invalidParamUser.service.js';


const users = []

export class UsersController{
    static getUsers = (req ,res) =>{
        res.send({ status:"Success", payload: users })
    }



    static getUserById = (req, res) =>{
        const uid = req.params.uid
        const userId = parseInt(uid)
    
        if(Number.isNaN(userId)){
            CustomError.createError({
                name: "UserById error",
                cause: invalidParamMessage(uid),
                message: "Param are invalid to search the user",
                code: EErrors.INVALID_PARAM
            })
        }
        res.json({status:"Success", message:"Found user"})
    }



    static createUser = (req, res) =>{
        const { first_name, last_name, email, age } = req.body
    
        if(!first_name || !last_name || !email){
            CustomError.createError({
                name: "User creating error",
                cause: generateUserErrorInfo({ first_name, last_name, email, age }),
                message: "Error trying to create the user",
                code: EErrors.INVALID_JSON
            })
        }
    
        const user = {
            first_name,
            last_name,
            age,
            email
        }
    
        if(users.length === 0){
            user.id = 1
        }
        else{
            user.id = user[user.length-1].id+1
        }
        users.push(user)
    
        res.send({ status: "Succes", payload: users })
    }



    static modifyRole = async(req, res) =>{
        try {
            const userId = req.params.uid
            const user = await UsersService.getUserById(userId)
            const userRole = user.role
    
            if(userRole === "user"){
                user.role = "premium"
            }
            else if (userRole === "premium"){
                user.role = "user"
            }
            else{
                return res.send({status:"Error", message:"Cannot change role of this user"})
            }
    
            await UsersService.updateUser(user._id, user)
            return res.send({status:"Success", message:`The new role of this user is ${user.role}`})
        }
        catch (error) {
            res.send({status:"Error", message:error.message})
        }
    }
}
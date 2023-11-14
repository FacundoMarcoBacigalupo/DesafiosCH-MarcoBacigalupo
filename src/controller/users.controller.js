import { UsersService } from "../service/users.service.js"
import { CustomError } from "../service/errors/CustomError.service.js";
import { generateUserErrorInfo } from "../service/errors/Info.service.js";
import { EErrors } from "../service/errors/Enums.service.js";
import { invalidParamMessage } from '../service/errors/invalidParamUser.service.js';



export class UsersController{

    static getUserById = async(req, res) =>{
        try {
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
    
            const user = await UsersService.getUserById(userId)
            res.json({status:"Success", message:"Found user", payload:user})
        }
        catch (error) {
            res.json({status:"Error", message:"Error trying get the user with that ID"})
        }
    }



    static createUser = async(req, res) =>{
        try {
            const { first_name, last_name, email, age } = req.body
    
            if(!first_name || !last_name || !email){
                CustomError.createError({
                    name: "User creating error",
                    cause: generateUserErrorInfo({ first_name, last_name, email, age }),
                    message: "Error trying to create the user",
                    code: EErrors.INVALID_JSON
                })
            }
        
            const newUser = {
                first_name,
                last_name,
                age,
                email
            }
        
            const userCreated = UsersService.createUser(newUser)
        
            res.send({ status: "Succes", message:"User created", payload: userCreated })
        }
        catch (error) {
            res.send({status:"Error", message:"Error trying create the user"})
        }
    }



    static modifyRole = async(req, res) =>{
        try {
            const uid = req.params.uid
            const userId = parseInt(uid)
    
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



    static updateUser = async(req, res) =>{
        try {
            const uid = req.params.uid
            const userId = parseInt(uid)
            const { first_name, last_name, email, age } = req.body
    
            if(!first_name || !last_name || !email){
                CustomError.createError({
                    name: "Updating user error",
                    cause: generateUserErrorInfo({ first_name, last_name, email, age }),
                    message: "Error trying to update the user",
                    code: EErrors.INVALID_JSON
                })
            }
        
            const userUpdate = {
                first_name,
                last_name,
                age,
                email
            }
        
            await UsersService.updateUser(userId, userUpdate)
        
            return res.send({status:"Success", message:"User updated"})
        }
        catch (error) {
            return res.send({status:"Error", message:"Error trying update the user with that ID"})
        }
    }
}
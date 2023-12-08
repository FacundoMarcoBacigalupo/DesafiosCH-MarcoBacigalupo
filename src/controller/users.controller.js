import { UsersService } from "../service/users.service.js"
import { CustomError } from "../service/errors/CustomError.service.js";
import { generateUserErrorInfo } from "../service/errors/Info.service.js";
import { EErrors } from "../service/errors/Enums.service.js";
import { invalidParamMessage } from '../service/errors/invalidParamUser.service.js';
import { generateEmailWithToken, emailRecoveryAcountDeleted } from "../helpers/gmail.js"


export class UsersController{
    static getUsers = async(req, res) =>{
        try {
            const users = await UsersService.getUsers()
            let { first_name, email, role } = users
            
            let userData = {
                first_name,
                email,
                role
            }
            
            res.json({status:"Success", message:"Found users", payload: userData})
        }
        catch (error) {
            console.log(error.message)
            res.json({status:"Error", message:"Error trying to get all  the users"})
        }
    }



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
            res.json({status:"Success", message:"Found user", payload: user})
        }
        catch (error) {
            console.log(error.message)
            res.status(400).json({status:"Error", message:"Error trying to get the user with that ID"})
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
            
            const userCreated = await UsersService.createUser(newUser)
            res.send({ status: "Succes", message:"User created", payload: userCreated })
        }
        catch (error) {
            console.log(error.message)
            res.status(400).send({status:"Error", message:"Error trying create the user"})
        }
    }




    static modifyRole = async(req, res) =>{
        try {
            const uid = req.params.uid
            const userId = parseInt(uid)
            
            const user = await UsersService.getUserById(userId)
            const userRole = user.role
            
            if(user.documents.length >= 3 && user.status === "complete"){
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
            else{
                res.json({status:"Error", message:"The user has not uploaded all the documents"})
            }
        }
        catch (error) {
            console.log(error.message)
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
            console.log(error.message)
            return res.send({status:"Error", message:"Error trying update the user with that ID"})
        }
    }




    static uploadDocuments = async(req, res) =>{
        try {
            const userId = req.params.uid
            const user = await UsersService.getUserById(userId)

            const identification = req.files?.identification?.[0] || null
            const domicile = req.files?.domicile?.[0] || null
            const accountStatus = req.files?.accountStatus?.[0] || null

            const docs = []
            if(identification){
                docs.push({name:identification, reference:identification.filename})
            };

            if(domicile){
                docs.push({name:domicile, reference:domicile.filename})
            };

            if(accountStatus){
                docs.push({name:accountStatus, reference:accountStatus.filename})
            };

            user.documents = docs
            if(docs.length === 3){
                user.stauts = "complete"
            }
            else{
                user.status = "incomplete"
            }

            const result = await UsersService.updateUser(user._id, user)
            res.json({status:"Success", data:result})
        }
        catch (error) {
            console.log(error.message)
            res.json({status:"Error", message:"Documents could not be loaded"})
        }
    }




    static deleteUsers = async(req, res) =>{
        try {
            const users = await UsersService.getUsers()
            
            for (const user of users) {
                if(user.last_connection < new Date()){
                    await UsersService.deleteUser(user._id)
                    const email = user.email
                    
                    if(email){
                        const token = generateEmailWithToken(email, 3*60)
                        emailRecoveryAcountDeleted(req, email, token)
                    }
                    else{
                        console.log(`The user ${user.first_name} does not have an email`);
                    }
                }
            };
            res.json({ status: "Success", message: "Emails sent for account deletion" });
        }
        catch (error) {
            console.log(error.message)
            res.status(500).json({status:"Error", message:"Can not delete the users"})
        }
    }
}

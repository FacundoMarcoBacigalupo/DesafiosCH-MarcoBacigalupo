import { UsersService } from "../service/users.service.js"


export class UsersController{
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
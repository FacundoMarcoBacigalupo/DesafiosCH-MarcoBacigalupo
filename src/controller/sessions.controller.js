import { UsersService } from "../service/users.service.js"
import { generateEmailWithToken, emailRecovery } from "../helpers/gmail.js"
import { validateToken, createHash } from "../utils.js"


export class SessionController{
    static successRegister = async(req, res) =>{
        const user = req.body
        return res.render("profile", {user, style: "forms.css"})
    }


    static failRegister = async(req, res) =>{
        return res.send({status:"Error", message:"Failed the strategy"})
    }


    static successLogin = async(req, res) =>{
        const user = req.user
        if(!user){
            return res.status(400).send({status:"Error", message:"Invalid credentials"})
        }
        req.session.user = {
            first_name: req.user.first_name,
            email: req.user.email,
            password: req.user.password
        }
        return res.render("profile", {user, style: "forms.css"})
    }


    static failLogin = (req, res) =>{
        return res.send({status:"Error", message:"User does not exist"})
    }


    static redirectGitHub = async(req, res) =>{}


    static failGitHub = async(req, res) =>{
        req.session.user = req.user
        return res.render("home", {style: "home.css"})
    }


    static logout = async(req, res) =>{
        try {
            let user = req.user
            user.last_connection = new Date()
            await UsersService.updateUser(user._id, user)
            
            await req.session.destroy(error =>{
                    if(error) return res.render("login", {user: req.session.userInfo, error:"Cannot close de session"}, {style: "forms.css"})
                })
            res.render("login", {style: "forms.css", message:"Logout successfully"})
        }
        catch (error) {
            console.log(error.message)
            res.status(500).json({ status: "Error", message: "Cannot close the session" });
        }
    }




    static deleteUser = async(req, res) =>{
        try {
            let user = req.user
            await UsersService.deleteUser(user._id)
            await req.session.destroy()
            res.render("home", {style: "home.css"})
        }
        catch (error) {
            console.log(error.message)
            res.status(500).json({ status: "Error", message: "Error with delete the user" });
        }
    }



    static deleteUserById = async(req, res) =>{
        try {
            let uID = req.params.uid
            await UsersService.deleteUser(uID)
            res.status(200).json({ status: "Success", message: `The user with the id ${uID} by deleted` });
        }
        catch (error) {
            console.log(error.message)
            res.status(500).json({ status: "Error", message: "Error with delete the user" });
        }
    }






    static forgotPassword = async(req ,res) =>{
        try {
            const { email } = req.body
            const user = UsersService.getUserByEmail(email)
            
            if(!user){
                res.json({status:"Error", message:"User do not found"})
            }
            const token = generateEmailWithToken(email, 3*60)
            await emailRecovery(req, email, token)
            
            res.render("home", {style: "home.css", message:`Email send to ${email}`})
        }
        catch (error) {
            console.log(error.message)
            res.json({status:"Error", message:"Can not restore the password"})
        }
    }


    static  resetPassword = async(req, res) =>{
        try {
            const token = req.query.token
            const {newPassword} = req.body
            const validEmail = validateToken(token)
            if(validEmail){
                let user = await UsersService.getUserByEmail(validEmail)
                if(user){
                    user.password = createHash(newPassword)
                    await UsersService.updateUser(user._id, user)
                    res.render("login", {style: "forms.css", message:"Password updated"})
                }
                else{
                    res.render("login", {style: "forms.css", error:"User not found"})
                }
            }
            else{
                res.render("login", {style: "forms.css", error:"The token expired"})
            }
        }
        catch (error) {
            console.log(error.message)
            res.render("login", {style: "forms.css", error:"Password could not be reset"})
        }
    }
}
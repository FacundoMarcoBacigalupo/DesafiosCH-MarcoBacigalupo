import { UsersService } from "../service/users.service.js"
import { generateEmailWithToken, emailRecovery } from "../helpers/gmail.js"
import { validateToken, createHash } from "../utils.js"


export class SessionController{
    static successRegister = (req, res) =>{
        const user = req.body
        return res.render("profile", {user}, {style: "forms.css"})
    }


    static failRegister = (req, res) =>{
        return res.render("register", {message:"Can not register the use"}, {style: "forms.css"})
    }


    static successLogin = (req, res) =>{
        let user = req.body
        return res.render("profile", {user})
    }


    static failLogin = (req, res) =>{
        return res.render("login", {message:"Can not login the user"}, {style: "forms.css"})
    }


    static redirectGitHub = async(req, res) =>{}


    static failGitHub = async(req, res) =>{
        req.session.user = req.user
        return res.render("home")
    }


    static logout = async(req, res) =>{
        try {
            const user = req.user
            user.last_connection = new Date()
            await UsersService.updateUser(user._id, user)
        
            await req.session.destroy(error =>{
                    if(error) return res.render("login", {user: req.session.userInfo, error:"Cannot close de session"}, {style: "forms.css"})
                })
        }
        catch (error) {
            console.log(error.message)
            return res.render("login", {user:req.user, error:"Cannot close de session"}, {style: "forms.css"})
        }
    }


    static forgotPassword = async(req ,res) =>{
        try {
            const { email } = req.body
            const user = UsersService.getUserByEmail(email)
            if(!user){
                res.send({status:"Error", message:"Can not restore the password"})
            }
            const token = generateEmailWithToken(email, 3*60)
            await emailRecovery(req, email, token)

            res.send("email send, back to the <a href='/'>home</a>")
        } catch (error) {
            console.log(error.message)
            res.send({status:"Error", message:"Can not restore the password"})
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
                    res.send("Password updated, <a href='/login'>Go to login</a>")
                }
            }
            else{
                return res.send("The token expired, <a href='/forgot-password'>try again<a>")
            }
        } catch (error) {
            console.log(error.message)
            res.send("password could not be reset, <a href='/forgot-password'>try again<a>")
        }
    }
}
import { UsersService } from "../service/users.service.js"
import { generateEmailWithToken, emailRecovery } from "../helpers/gmail.js"
import { validateToken, createHash } from "../utils.js"


export class SessionController{
    static redirectRegister = async(req, res) =>{
        return res.redirect("/login", {messagge:"Register user for login"})
    }


    static failRegister = async(req, res) =>{
        return res.send("<p>Can not register the user, <a href='/register'>Try again</a></p>");
    }


    static redirectLogin = async(req, res) =>{
        let user = req.user
        return res.render("/profile", {style: "forms.css"})
    }


    static failLogin = async(req, res) =>{
        return res.send("<p>Can not login the user, <a href='/login'>Try again</a></p>");
    }


    static redirectGitHub = async(req, res) =>{}


    static failGitHub = async(req, res) =>{
        req.session.user = req.user
        return res.render("/")
    }


    static redirectLogout = (req, res) =>{
        req.logOut(error =>{
            if(error){
                return res.render("/login", {user: req.user, error:"Cannot close de session"}, {style: "forms.css"})
            }
            else{
                req.session.destroy(error =>{
                    if(error) return res.render("login", {user: req.session.userInfo, error:"Cannot close de session"}, {style: "forms.css"})
                    res.redirect("/")
                })
            }
        })
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

            res.send("email send, back to the <a>home</a>")
        } catch (error) {
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
            res.send("password could not be reset, <a href='/forgot-password'>try again<a>")
        }
    }
}
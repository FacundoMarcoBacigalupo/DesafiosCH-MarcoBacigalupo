import { UsersService } from "../service/users.service.js"
import { generateEmailWithToken, emailRecovery } from "../helpers/gmail.js"
import { validateToken, createHash } from "../utils.js"


export class SessionController{
    static successRegister = async(req, res) =>{
        const user = req.body
        return res.render("profile", {user})
    }


    static failRegister = async(req, res) =>{
        return res.send({status:"Error", message:"Failed the strategy"})
    }


    static successLogin = async(req, res) =>{
        const user = req.user
        if(!req.user){
            return res.status(400).send({status:"Error", message:"Invalid credentials"})
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name:  req.user.last_name,
            email: req.user.email
        }
        return res.render("profile", {user})
    }


    static failLogin = (req, res) =>{
        return res.send({status:"Error", message:"Failed the strategy"})
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
            res.json({status:"Success", message:"Logout successfully"});
        }
        catch (error) {
            console.log(error.message)
            res.status(500).json({ status: "Error", message: "Cannot close the session" });
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
            
            res.send(`<h2 style="color: rgb(77, 77, 77)">Email send to <span style="color: #000">${email}</span></h2> <br> <h3 style="color: rgb(77, 77, 77)">Back to the <a href='/'>home</a></h3>`)
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
                    res.send(`<h2 style="color: rgb(77, 77, 77)">Password updated</h2> <br> <h3 style="color: rgb(77, 77, 77)"><a href='/login'>Go to login</a></h3>`)
                }
                else{
                    res.send(`<h2 style="color: rgb(77, 77, 77)">User not found</h2>`)
                }
            }
            else{
                return res.send(`<h2 style="color: rgb(77, 77, 77)">The token expired</h2> <br> <h3 style="color: rgb(77, 77, 77)"><a href='/forgot-password'>Try again<a></h3>`)
            }
        }
        catch (error) {
            console.log(error.message)
            res.send(`<h2>Password could not be reset</h2> <br> <h3><a href='/forgot-password'>Try again<a></h3>`)
        }
    }
}
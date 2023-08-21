import { Router } from "express";
import { usersService } from '../dao/servicesMongo.js'


const router = Router()



router.post("/register", async(req, res) =>{
    try {
        let registerForm = req.body

        let user = await usersService.getUserByEmail(registerForm.email)
        if(user){
            res.render("register", {error:"User already exist"})
        }

        if(user.email === "adminCoder@coder.com" && user.password === "adminCod3r123"){
            user.role.push("admin")
            console.log(user)
        }

        await usersService.createUser(registerForm)
        res.render("login", {messagge:"Register user for login"})
    } catch (error) {
        res.render("register", {error:error.message})
    }
})



router.post("/login", async(req, res) =>{
    try {
        let loginForm = req.body

        let user = await usersService.getUserByEmail(loginForm.email)
        if(!user){
            res.render("login", {error:"User not register"})
        }

        if(user.password === loginForm.password){
            req.session.userInfo = {
                first_name:user.first_name,
                email:user.email
            }
            res.render("chat")
        }
        else{
            res.render("login", {error:"Credencial are not validation"})
        }
    } catch (error) {
        res.render("register", {error:error.message})
    }
})



router.get("/logout", (req, res) =>{
    req.session.destroy(error =>{
        if(error) return res.render("login", {user: req.session.userInfo, error:"Cannot close de session"})
        res.redirect("/")
    })
})



export { router as sessionsRouter }
import { Router } from "express";
import passport from "passport";

const router = Router()



//Ruta register
router.post("/register", passport.authenticate("registerStrategy", {failureRedirect:"/api/sessions/failRegister"}), async(req, res) =>{
    return res.render("login", {messagge:"Register user for login"})
})

router.get("/failRegister", async(req, res) =>{
    return res.render("register", {error:error.message}, {style: "forms.css"})
})




//Ruta login
router.post("/login", passport.authenticate("loginStrategy",{failureRedirect:"/api/sessions/failLogin"}), async(req, res) =>{
    return res.redirect("/")
})

router.get("/failLogin", async(req, res) =>{
    return res.render("login", {error:"Failed login"}, {style: "forms.css"})
})




//Ruta github
router.get("/loginGithub", passport.authenticate("githubStrategy"))

router.get("/github-callback", passport.authenticate("githubStrategy"), {
    failureRedirect: "/api/sessions/failRegister"
}, (req, res) =>{
    return res.render("/")
})




//Ruta logout
router.get("/logout", (req, res) =>{
    req.logOut(error =>{
        if(error){
            return res.render("login", {user: req.user, error:"Cannot close de session"}, {style: "forms.css"})
        }
        else{
            req.session.destroy(error =>{
                if(error) return res.render("login", {user: req.session.userInfo, error:"Cannot close de session"}, {style: "forms.css"})
                res.redirect("/")
            })
        }
    })
})



export { router as sessionsRouter }
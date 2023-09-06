import { Router } from "express";
import passport from "passport";

const router = Router()



//Ruta register
router.post("/register", passport.authenticate("registerStrategy", {failureRedirect:"/api/sessions/failRegister"}), async(req, res) =>{
    return res.redirect("login", {messagge:"Register user for login"})
})

router.get("/failRegister", async(req, res) =>{
    return res.send("<p>Can not register the user, <a href='/register'>Try again</a></p>");
})




//Ruta login
router.post("/login", passport.authenticate("loginStrategy",{failureRedirect:"/api/sessions/failLogin"}), async(req, res) =>{
    let user = req.user
    return res.render("/profile", {style: "forms.css"})
})

router.get("/failLogin", async(req, res) =>{
    return res.send("<p>Can not login the user, <a href='/login'>Try again</a></p>");
})




//Ruta github
router.get("/github", passport.authenticate("githubStrategy",{scope:["user:email"]}), async(req, res) =>{})

router.get("/githubcallback", passport.authenticate("githubStrategy", {failureRedirect:"/api/sessions/failRegister"}), async(req, res) =>{
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
import { Router } from "express";
import passport from "passport";
import { SessionController } from "../controller/sessions.controller.js";


const router = Router()



//Ruta register
router.post("/register", passport.authenticate("registerStrategy", {failureRedirect:"/api/sessions/failRegister"}), SessionController.redirectRegister)

router.get("/failRegister", SessionController.failRegister)


//Ruta login
router.post("/login", passport.authenticate("loginStrategy",{failureRedirect:"/api/sessions/failLogin"}), SessionController.redirectLogin)

router.get("/failLogin", SessionController.failLogin)


//Ruta github
router.get("/github", passport.authenticate("githubStrategy",{scope:["user:email"]}), SessionController.redirectGitHub)

router.get("/githubcallback", passport.authenticate("githubStrategy", {failureRedirect:"/api/sessions/failRegister"}), SessionController.failGitHub)


//Ruta logout
router.get("/logout", SessionController.redirectLogout)


router.post("/forgot-password", SessionController.forgotPassword)

router.post("/reset-password", SessionController.resetPassword)

export { router as sessionsRouter }
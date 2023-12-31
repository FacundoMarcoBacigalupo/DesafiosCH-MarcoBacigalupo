import { Router } from "express";
import passport from "passport";
import { SessionController } from "../controller/sessions.controller.js";
import { uploaderProfile } from "../utils.js";


const router = Router()


//Route register
router.post("/register", uploaderProfile.single("profile"), passport.authenticate("registerStrategy", {failureRedirect:"/api/sessions/failRegister"}), SessionController.successRegister)

router.get("/failRegister", SessionController.failRegister)


//Route login
router.post("/login", passport.authenticate("loginStrategy", {failureRedirect:"/api/sessions/failLogin"}), SessionController.successLogin)

router.get("/failLogin", SessionController.failLogin)


//Route github
router.get("/github", passport.authenticate("githubStrategy", {scope:["user:email"]}), SessionController.redirectGitHub)

router.get("/githubcallback", passport.authenticate("githubStrategy", {failureRedirect:"/api/sessions/failRegister"}), SessionController.failGitHub)


//Route logout
router.get("/logout", SessionController.logout)


//Route delete
router.get("/deleteUser", SessionController.deleteUser)

//Route delete user by id
router.get("/deleteUser/:uid", SessionController.deleteUserById)


//Route forgot-password"
router.post("/forgot-password", SessionController.forgotPassword)

router.post("/reset-password", SessionController.resetPassword)

export { router as sessionsRouter }
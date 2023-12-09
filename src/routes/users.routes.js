import { Router } from "express";
import { UsersController } from "../controller/users.controller.js";
import { checkRole } from "../dao/middlewares/auth.js";
import { uploaderDocuments } from "../utils.js"


const router = Router()


//Get all users
router.get("/getUsers", UsersController.getUsers)


//Get user by id
router.get("/:uid", UsersController.getUserById)


//Create user
router.post("/", UsersController.createUser)


//Update user
router.put("/:uid", UsersController.updateUser)


//Change role to premium a user or user to premium
router.put("/premium/:uid", checkRole(["admin"]), UsersController.modifyRole)


//Documents
router.put("/:uid/documents", uploaderDocuments.fields([
    {name:"identification", maxCount:1},
    {name:"domicile", maxCount:1},
    {name:"accountStatus", maxCount:1}
]), UsersController.uploadDocuments)



router.delete("/", UsersController.deleteUsers)


export { router as userRouter }
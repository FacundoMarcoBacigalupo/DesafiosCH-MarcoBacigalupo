import { Router } from "express";
import { UsersController } from "../controller/users.controller.js";
import { checkRole } from "../dao/middlewares/auth.js";


const router = Router()


//Get user by id
router.get("/:uid", UsersController.getUserById)


//Create user
router.post("/", UsersController.createUser)


//Update user
router.put("/:uid", UsersController.updateUser)


//Change role to premium a user or user to premium
router.post("premium/:uid", checkRole(["admin"]), UsersController.modifyRole)



export { router as userRouter }
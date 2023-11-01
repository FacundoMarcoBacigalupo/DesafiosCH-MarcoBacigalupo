import { Router } from "express";
import { CustomError } from "../service/errors/CustomError.service.js";
import { generateUserErrorInfo } from "../service/errors/Info.service.js";
import { EErrors } from "../service/errors/Enums.service.js";
import { invalidParamMessage } from '../service/errors/invalidParamUser.service.js';
import { UsersController } from "../controller/users.controller.js";
import { checkRole } from "../dao/middlewares/auth.js";


const router = Router()

const users = []


router.get("/", (req ,res) =>{
    res.send({ status:"Succes", payload: users })
})



router.get("/:uid", (req, res) =>{
    const uid = req.params.uid
    const userId = parseInt(uid)

    if(Number.isNaN(userId)){
        CustomError.createError({
            name: "UserById error",
            cause: invalidParamMessage(uid),
            message: "Param are invalid to search the user",
            code: EErrors.INVALID_PARAM
        })
    }
    res.json({status:"Success", message:"Found user"})
})



router.post("/", (req, res) =>{
    const { first_name, last_name, email, age } = req.body

    if(!first_name || !last_name || !email){
        CustomError.createError({
            name: "User creating error",
            cause: generateUserErrorInfo({ first_name, last_name, email, age }),
            message: "Error trying to create the user",
            code: EErrors.INVALID_JSON
        })
    }

    const user = {
        first_name,
        last_name,
        age,
        email
    }

    if(users.length === 0){
        user.id = 1
    }
    else{
        user.id = user[user.length-1].id+1
    }
    users.push(user)

    res.send({ status: "Succes", payload: users })
})




router.post("premium/:uid", checkRole(["admin"]), UsersController.modifyRole)




export { router as userRouter }
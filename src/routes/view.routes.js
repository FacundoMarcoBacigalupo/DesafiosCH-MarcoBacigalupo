import { Router } from "express";


const router = Router()


router.get("/", (req, res) =>{
    try {
        res.render("home", { style: "chat.css" })
    }
    catch (error) {
        res.send({status:"error", message: error.message})
    }
})


export { router as viewRouters }
import { Router} from "express";
import { checkUserAuthenticate } from "../dao/middlewares/auth.js"
import { ViewsController } from "../controller/views.controller.js";


const router = Router()



//Vista Home
router.get("/", async(req, res) =>{
    try {
        res.render("home", { style: "home.css" })
    }
    catch (error) {
        res.render("home", { style: "home.css" }, {error: "Error with load home"})
    }})


//Vista Chat
router.get("/chat", ViewsController.renderChat)


//Vista Productos
router.get("/products", checkUserAuthenticate, ViewsController.renderProducts)


//Vista CartId
router.get("/carts:cid", ViewsController.renderCartId)


//Vista registro
router.get("/register", ViewsController.renderRegister)


//Vista login
router.get("/login", ViewsController.renderLogin)


//Vista profile
router.get("/profile", ViewsController.renderProfile)




export { router as viewRouters }
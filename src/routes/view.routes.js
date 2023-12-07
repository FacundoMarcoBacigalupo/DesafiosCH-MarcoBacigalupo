import { Router} from "express";
import { checkUserAuthenticate } from "../dao/middlewares/auth.js";
import { ViewsController } from "../controller/views.controller.js";


const router = Router();


//View Home
router.get("/", ViewsController.renderHome);


//View Chat
router.get("/chat", ViewsController.renderChat);


//View products
router.get("/products", checkUserAuthenticate, ViewsController.renderProducts);


//View CartId
router.get("/carts", checkUserAuthenticate, ViewsController.renderCart);


//View register
router.get("/register", ViewsController.renderRegister);


//View login
router.get("/login", ViewsController.renderLogin);


//View profile
router.get("/profile", ViewsController.renderProfile);


//View recuperar contraseña
router.get("/forgot-password", ViewsController.renderForgotPassword)

router.get("/reset-password", ViewsController.renderReserPassword)


export { router as viewRouters };
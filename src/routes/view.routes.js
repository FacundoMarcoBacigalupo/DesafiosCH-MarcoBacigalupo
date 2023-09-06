import { Router, query } from "express";
import { productService } from '../dao/servicesMongo.js'
import { cartService } from '../dao/servicesMongo.js'
import { checkUserAuthenticate, showLoginView } from "../dao/middlewares/auth.js"


const router = Router()



//Vista Home
router.get("/", async(req, res) =>{
    try {
        res.render("home", { style: "home.css" })
    }
    catch (error) {
        res.render("home", { style: "home.css" }, {error: "Error with load home"})
    }
})





//Vista Chat
router.get("/chat", async(req, res) =>{
    try {
        res.render("chat", { style: "chat.css" })
    }
    catch (error) {
        res.send("<h3><strong> Error with get the Global Chat </strong></h3>")
    }
})




//Vista Productos
router.get("/products", checkUserAuthenticate, async(req, res) =>{
    try {
        const { limit=10, page=1, stock, sort="asc", category } = req.query

        const stockValue = stock === 0 ? undefined : parseInt(stock)

        if(!["asc", "desc"].includes(sort)){
            res.render("products", { style: "products.css" }, {error: "Order invalid"})
        }
        const sortValue = sort === "asc" ? 1 : -1

        if(stockValue){
            query = {category:{$gte:category}, stock: {$gte:stockValue}}
        }

        const result = await productService.getProductsPaginate(query, {
            page,
            limit,
            sort:{price:sortValue},
            lean:true
        })

        const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`

        const resultProductsView = {
            status:"success",
            payload:result.docs,
            totalPages:result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
            nextLink: result.hasNextPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)}` : null
        }

        res.render("products", resultProductsView, { style: "products.css" })
    }
    catch (error) {
        res.render("products", { style: "products.css" }, {error: "Dates not render"})
    }
})




//Vista CartId
router.get("/carts:cid", async(req, res) =>{
    try {
        let cartId = parseInt(req.params.cid)
        let cart = await cartService.getCartById(cartId)

        res.render("cartsId", { style: "cartsId.css" })
    }
    catch (error) {
        res.send("<h3><strong> Error with get the Cart </strong></h3>")
    }
})




//Vista registro
router.get("/register", (req, res) =>{
    res.render("register", {style: "forms.css"})
})




//Vista login
router.get("/login", (req, res) =>{
    res.render("login", {style: "forms.css"})
})



//Vista profile
router.get("/profile", (req, res) =>{
    let user = req.user
    res.render("profile", {user}, {style: "forms.css"})
})




export { router as viewRouters }
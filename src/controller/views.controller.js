import { productDao } from '../dao/factory.js';
import { cartDao } from '../dao/factory.js';
import { UsersService } from "../service/users.service.js"



export class ViewsController{
    static renderHome = async(req, res) =>{
        try {
            res.render("home", { style: "home.css" })
        }
        catch (error) {
            console.log(error.message)
            res.render("home", { style: "home.css", error:"Error with load home" })
        }
    };



    static renderChat = async(req, res) =>{
        try {
            res.render("chat", { style: "chat.css" })
        }
        catch (error) {
            console.log(error.message)
            res.send("<h3><strong>Error with get the Global Chat</strong></h3>")
        }
    };



    static renderProducts = async(req, res) =>{
        try {
            let user = req.user
            const { limit=5, page=1, stock, sort="asc", category } = req.query
            
            const stockValue = stock === 0 ? undefined : parseInt(stock)
            
            if(!["asc", "desc"].includes(sort)){
                res.render("products", { style: "forms.css", error: "Order invalid"})
            }
            const sortValue = sort === "asc" ? 1 : -1;
            let query = {};
            if(stockValue){
                query = {category:{$gte:category}, stock:{$gte:stockValue}}
            };
            
            const result = await productDao.getProductsPaginate(query, {
                page,
                limit,
                sort:{price:sortValue},
                lean:true
            })
            
            const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
            
            let resultProductsView = {
                status:"Success",
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
            
            res.render("products", {...resultProductsView, user, style: "forms.css"})
        }
        catch (error) {
            console.log(error.message)
            res.render("products", { style: "forms.css", error: "Dates not render"})
        }
    };



    static renderCart = async(req, res) =>{
        try {
            let user = req.user
            let cartUserId = user.cartId
            const cart = await cartDao.getCartById(cartUserId)

            res.render("carts", {cart, user, style: "forms.css"})
        }
        catch (error) {
            console.log(error.message)
            res.render("carts", {style: "forms.css", error:"Error with get the Cart"})
        }
    };



    static renderRegister = (req, res) =>{
        res.render("register", {style: "forms.css"})
    };



    static renderLogin = async(req, res) =>{
        try {
            res.render("login", {style: "forms.css"})   
        } 
        catch (error) {
            console.log(error,message)
            throw new Error
        }
    };



    static renderProfile = (req, res) =>{
        let user = req.user
        res.render("profile", {user, style: "forms.css"})
    };



    static renderForgotPassword = (req, res) =>{
        res.render("forgotPassword", {style: "forms.css"})
    }



    static renderReserPassword = (req, res) =>{
        const token = req.query.token;
        res.render("resetPassword", {token, style: "forms.css"})
    }



    static renderDashboardUsers = async(req, res) =>{
        try {
            const users = await UsersService.getUsers()
            res.render("dashboardUsers", {users, style: "forms.css"})
        }
        catch (error) {
            res.json({status:"Error", message:error.message})
        }
    }
};
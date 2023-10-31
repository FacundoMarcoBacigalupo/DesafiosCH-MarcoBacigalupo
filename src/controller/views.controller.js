import { query } from "express";
import { productDao } from '../dao/factory.js';
import { cartDao } from '../dao/factory.js';



export class ViewsController{
    static renderHome = async(req, res) =>{
        try {
            res.render("home", { style: "home.css" })
        }
        catch (error) {
            res.send("<h3><strong> Error with load home </strong></h3>")
        }
    };


    static renderChat = async(req, res) =>{
        try {
            res.render("chat", { style: "chat.css" })
        }
        catch (error) {
            res.send("<h3><strong> Error with get the Global Chat </strong></h3>")
        }
    };


    static renderProducts = async(req, res) =>{
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
    
            const result = await productDao.getProductsPaginate(query, {
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
    };


    static renderCartId = async(req, res) =>{
        try {
            let cartId = parseInt(req.params.cid)
            let cart = await cartDao.getCartById(cartId)
    
            res.render("cartsId", { style: "cartsId.css" })
        }
        catch (error) {
            res.send("<h3><strong> Error with get the Cart </strong></h3>")
        }
    };


    static renderRegister = (req, res) =>{
        res.render("register", {style: "forms.css"})
    };


    static renderLogin = (req, res) =>{
        res.render("login", {style: "forms.css"})
    };


    static renderProfile = (req, res) =>{
        let user = req.user
        res.render("profile", {user}, {style: "forms.css"})
    };


    static renderForgotPassword = (req, res) =>{
        res.render("forgotPassword")
    }


    static renderReserPassword = (req, res) =>{
        const token = req.query.token;

        res.render("resetPassword", {token})
    }
};
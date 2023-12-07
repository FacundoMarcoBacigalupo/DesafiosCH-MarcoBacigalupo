import { ProductService } from "../service/products.service.js"
import { generateEmailWithToken, emailRecoveryProductDeleted } from "../helpers/gmail.js"


export class ProductsController{
    static getProducts = async(req, res) =>{
        try {
            const limit = req.query.limit;
            const { count, products } = await ProductService.getProducts()

            if(limit){
                const result = products.filter((prod, index) => index < limit);
                res.json({status:"Success", count, data: result})
            }
            else{
                res.json({status:"Success", count,  data: products})
            }
        }
        catch (error) {
            console.log(error.message)
            res.json({status: "Error", message: error.message})
        }
    }


    static getProductsById = async(req, res) =>{
        try {
            let pid = req.params.pid
            let productId = await ProductService.getProductById(pid)
    
            if(!productId){
                res.json({status: "Error", message: "Not exist product with that ID"})
            }
            else{
                res.json({status: "Success", data: productId})
            }
        }
        catch (error) {
            console.log(error.message)
            res.json({status:"Error", message: error.message})
        }
    }


    static createProduct = async(req, res) =>{
        try {
            const productInfo = req.body;
            productInfo.owner = req.user._id;
            productInfo.thumbnail = req.file.filename
            
            const productCreated = await ProductService.createProduct(productInfo)
            res.json({status:"Success", data: productCreated, message:"Created product"})
        }
        catch (error) {
            console.log(error.message)
            res.json({status: "Error", message: error.message})
        }
    }


    static updateProduct = async(req, res) =>{
        try {
            let pid = req.params.pid
            let product = req.body
            let productUpdate = await ProductService.updateProduct(pid, product)
            
            if(!productUpdate){
                res.json({status:"Error", message: "Not exist product with that ID"})
            }
            else{
                res.json({status: "Success", data: productUpdate})
            }
        }
        catch (error) {
            console.log(error.message)
            res.json({status:"Error", message: error.message})
        }
    }



    static deleteProduct = async(req, res) =>{
        try {
            let pid = req.params.pid
            let product = await ProductService.getProductById(pid)
            
            if(req.user.role === "premium" && product.owner.toString() === req.user._id.toString() || req.user.role === "admin"){
                await ProductService.deleteProduct(pid)
                
                const email = req.user.email
                if(email){
                    const token = generateEmailWithToken(email, 3*60)
                    await emailRecoveryProductDeleted(req, email, token)
                    res.json({status: "Success", message:`Email send to ${email} for the product deleted`})
                }
                else{
                    res.json({status: "Error", message:`The user ${user.first_name} do not have this email ${email}`})
                }
                
                res.json({status: "Success", message:"Product eliminated"})
            }
            else{
                res.json({status:"Error", message: "You don't have permissions"})
            }
        }
        catch (error) {
            console.log(error.message)
            res.json({status:"Error", message: error.message})
        }
    }
}
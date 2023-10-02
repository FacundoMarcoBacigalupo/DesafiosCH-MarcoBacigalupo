import { ProductService } from "../service/products.service.js"


export class ProductsController{
    static getProducts = async(req, res) =>{
        try {
            let limit = parseInt(req.query.limit)
            const product = await ProductService.getProducts()
            if(limit){
                const result = product.filter(pro => pro.id <= limit)
                res.json({status:"success", data: result})
            }
            else{
                res.json({status:"success", data: product})
            }
        }
        catch (error) {
            res.json({status: "error", message: error.message})
        }
    }


    static getProductsById = async(req, res) =>{
        try {
            let pid = parseInt(req.params.pid)
            let productId = await ProductService.getProductById(pid)
    
            if(!productId){
                res.json({status:"error", message: "Not exist product with that ID"})
            }
            else{
                res.json({status: "success", data: productId})
            }
        }
        catch (error) {
            res.json({status:"error", message: error.message})
        }
    }


    static createProduct = async(req, res) =>{
        try {
            const productInfo = req.body
            const productCreated = await ProductService.addProduct(productInfo) 
            res.json({status:"success", data: productCreated, message:"Created product"})
        }
        catch (error) {
            res.json({status: "error", message: error.message})
        }
    }


    static updateProduct = async(req, res) =>{
        try {
            let pid = parseInt(req.params.pid)
            let product = req.body
            let productUpdate = await ProductService.updateProduct(pid, product)
    
            if(!productUpdate){
                res.json({status:"error", message: "Not exist product with that ID"})
            }
            else{
                res.json({status: "success", data: productUpdate})
            }
        }
        catch (error) {
            res.json({status:"error", message: error.message})
        }
    }


    static deleteProduct = async(req, res) =>{
        try {
            let pid = parseInt(req.params.pid)
            let deleteProduct = await ProductService.deleteProduct(pid)
    
            if(!deleteProduct){
                res.json({status:"error", message: "Not exist product with that ID"})
            }
            else{
                res.json({status: "success", data: deleteProduct})
            }
        }
        catch (error) {
            res.json({status:"error", message: error.message})
        }
    }
}
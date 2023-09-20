import { productDao } from "../dao/servicesMongo"


export class ProductService{
    static getProducts = async() =>{
        return await productDao.getProducts()
    }


    static getProductById = async(pid) =>{
        return await productDao.getProductById(pid)
    }


    static createProduct = async(productInfo) =>{
        return await productDao.addProduct(productInfo)
    }


    static updateProduct = async(pid, product) =>{
        return await productDao.updateProduct(pid, product)
    }


    static deleteProduct = async(pid) =>{
        return await productDao.deleteProduct(pid)
    }
}
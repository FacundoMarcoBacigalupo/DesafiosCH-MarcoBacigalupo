import express from 'express'
import  ProductManager  from "./ClassProductManager.js"
import fs from 'fs'
import { pid } from 'process'

const filePath = "./users.json"
const manager = new ProductManager(filePath)

const app = express()
const port = 8080

app.listen(port, () => console.log("Servidor levantado en el puerto ", port))

app.use(express.urlencoded({extended:true}))

const operations = async() =>{
/*
    try{
        manager.addProduct("laptop", "laptop samsung", 4000, "./laptopImg.jpg", 1, 22)
    }
    catch(error){
        console.log(error.message)
    }
*/



    app.get("/products", async(req, res) =>{
        try {
            let code = parseInt(req.query.code)

            if(!code){
                const products = await manager.getProducts()
                res.send(products)
            }
            else{
                const contentTheFile = await fs.promises.readFile("./users.json", "utf-8")
                const content = JSON.parse(contentTheFile)
    
                let productoFilterCode = content.filter(p => p.code === code)
                res.send(productoFilterCode)
            }
        }
        catch (error){
            res.send(error.message)
        }
    })



    app.get("/products:pid", async(req, res) =>{
        try {
            const pId = await parseInt(req.params.pid)
            console.log(pId)

            const contentTheFile = await fs.promises.readFile("./users.json", "utf-8")
            const content = JSON.parse(contentTheFile)

            let product = content.find(p => p.id === pId)
            if(!product){
                res.send("No existe")
            }
            else{
                res.send({product})
            }
        }
        catch (error){
            res.send(error.message)
        }
    })
}

operations()    
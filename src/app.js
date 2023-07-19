import express from 'express'
import path from "path"
import { engine } from "express-handlebars"
import { __dirname } from './utils.js'
import { Server } from 'socket.io'

import { productsRouter } from './routes/products.routes.js'
import { cartsRouter } from './routes/carts.routes.js'

import { viewRouters } from './routes/view.routes.js'

import ProductManager from './dao/productsManager.js'



const app = express()
const port = 8080
//Server http
const httpServer = app.listen(port, ()=> console.log("Listen Server in port:", port))

//Middlewares
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



//configuracion de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));



const io = new Server(httpServer)


//Routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use(viewRouters)



//Server socket
io.on("connection", async(socket)=>{
    const productService = new ProductManager("products.json")
    const products = await productService.getProducts()

    console.log("New cliente connected:", socket.id)

    socket.emit("products", {products})

    socket.on("newProduct", async({result}) =>{
        try {
            productService.addProduct(result.value.title, result.value.description, result.value.code, result.value.price, true, result.value.stock, result.value.category, null)
        }
        catch (error) {
            console.log(error.message)
        }
    })
})
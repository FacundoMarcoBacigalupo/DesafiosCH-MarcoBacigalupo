import express from 'express'
import { productsRouter } from './routes/products.routes.js'
import { cartsRouter } from './routes/carts.routes.js'


const app = express()
const port = 8080


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Listen Server
app.listen(port, () => console.log("Listen Server in port:", port))


//Routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
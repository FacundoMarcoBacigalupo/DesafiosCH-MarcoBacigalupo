import express from 'express'
import path from "path"
import { engine } from "express-handlebars"
import { __dirname } from './utils.js'
import { config } from './config/config.js'
import { connectDB } from './config/dbConnection.js'
import { chatModel } from './dao/models/chat.model.js'

import { productsRouter } from './routes/products.routes.js'
import { cartsRouter } from './routes/carts.routes.js'

import { Server } from 'socket.io'
import { viewRouters } from './routes/view.routes.js'




//Server http
const app = express()
const port = config.server.port
const httpServer = app.listen(port, ()=> console.log("Listen Server in port:", port))




//Middlewares
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))




//configuracion de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));



//Conexino a la base de datos
connectDB()



//Routes
app.use(viewRouters)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)





//Server socket (Chat)
const io = new Server(httpServer)

io.on("connection",(socket)=>{
    console.log("nuevo cliente conectado");

    socket.on("authenticated", async(msg)=>{
        const messages = await chatModel.find()

        socket.emit("messageHistory", messages);
        socket.broadcast.emit("newUser",msg);
    });


    socket.on("message", async(data)=>{
        console.log("data", data);
        await chatModel.create(data)
        const messages = await chatModel.find()


        io.emit("messageHistory", messages);
    })
})
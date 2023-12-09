import path from "path";
import { __dirname } from './utils.js';

import express from 'express';
import { engine } from "express-handlebars";
import session from "express-session";

import { Server } from 'socket.io';
import { chatModel } from './dao/models/chat.model.js';

import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { sessionsRouter } from './routes/sessions.routes.js';
import { viewRouters } from './routes/view.routes.js';
import { mockingProductsRouter } from "./routes/mockingproducts.routes.js";
import { loggerTestRouter } from "./routes/loggerTest.routes.js";

import MongoStore from 'connect-mongo';
import passport from 'passport';

import { config } from './config/config.js';
import { initializePassport } from './config/passport.config.js';
import { userRouter } from "./routes/users.routes.js";

import { errorHandler } from "./dao/middlewares/errorHandler.js";

import { swaggerSpecs } from './config/swagger.config.js';
import swaggerUI from "swagger-ui-express";




const port = config.server.port;
const app = express();


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));


//Server http
const httpServer = app.listen(port, ()=> console.log("Listen Server in port: ", port));



//configuracion de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));




//Sessions
app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongo.url
    }),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true
}));

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());





//Routes
app.use(viewRouters);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", userRouter);

app.use("/mockingproducts", mockingProductsRouter);
app.use("/loggerTest", loggerTestRouter);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use(errorHandler);







//Server socket (Chat)
const io = new Server(httpServer);

io.on("connection",(socket)=>{
    console.log("nuevo cliente conectado");

    socket.on("authenticated", async(msg)=>{
        const messages = await chatModel.find()

        socket.emit("messageHistory", messages);
        socket.broadcast.emit("newUser",msg);
    });


    socket.on("message", async(data)=>{
        console.log("data:", data);
        await chatModel.create(data)
        const messages = await chatModel.find()


        io.emit("messageHistory", messages);
    })
});



export { app }
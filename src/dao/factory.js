import { config } from "../config/config.js"


let persistense = config.server.persistense


let cartDao;
let productDao;
let usersDao;
let ticketsDao;


switch(persistense) {
    case "MONGO":
        const { connectDB } = await import('../config/dbConnection.js')
        connectDB()

        const { CartsMongo } = await import("./managers/mongo/cartsMongo.js")
        const { ProductsMongo } = await import("./managers/mongo/productsMongo.js")
        const { UsersMongo } = await import("./managers/mongo/usersMongo.js")
        const { TicketsMongo } = await import("./managers/mongo/tickets.mongo.js")


        cartDao = new CartsMongo()
        productDao = new ProductsMongo()
        usersDao = new UsersMongo()
        ticketsDao = new TicketsMongo()
    break;


    case "FS":
        const { CartFile } = await import("./managers/fileSystem/cartsFiles.js")
        const { ProductFile } = await import("./managers/fileSystem/productsFiles.js")

        cartDao = new CartFile()
        productDao = new ProductFile()
    break;
};


export { cartDao, productDao, usersDao, ticketsDao }
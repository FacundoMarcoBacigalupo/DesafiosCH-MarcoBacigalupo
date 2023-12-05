import { TicketsService } from "../service/tickets.service.js"
import { CartsService } from "../service/carts.service.js"
import { ProductService } from "../service/products.service.js"


export class TicketsController{
    static createTicket = async(req, res) =>{
        try {
            let cardId = req.params.cid
            let cart = await CartsService.getCartById(cardId)
            let productCart = cart.products
            
            let purchaseProducts = []
            let rejectedProducts = []
            
            for(let i = 0; i < productCart.length; i++){
                let product = await ProductService.getProductById(productCart[i].productId)
                if(product.quantity < product.stock){
                    purchaseProducts.push(product)
                }
                else{
                    rejectedProducts.push(product)
                }
            }
            
            console.log("purchase:",purchaseProducts, "reject:",rejectedProducts)
            
            const newTicket = {
                code: `${new Date().toDateString()}-code-${req.user.email}`,
                purchase_datetime: new Date(),
                amount: purchaseProducts.length,
                purchaser: req.user.email
            }
            
            const ticketCreted = await TicketsService.createTickets(newTicket)
            res.json({status: "Success", payload: ticketCreted})
        }
        catch (error) {
            console.log(error.message)
            res.json({status: "Error", message: error})
        }
    }
}
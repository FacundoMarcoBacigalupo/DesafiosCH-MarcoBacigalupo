import { TicketsService } from "../service/tickets.service.js"
import { CartsService } from "../service/carts.service.js"
import { ProductService } from "../service/products.service.js"


export class TicketsController{
    static createTicket = async(req, res) =>{
        try {
            const cardId = req.params.cid
            const card = await CartsService.getCartById(cardId)
            const productCart = cart.products

            let purchaseProducts = []
            let rejectedProducts = []

            for(let i = 0; i < productCart.leght; i++){
                let product = ProductService.getProductById(productCart[i].productId)
                if(product.quantity < product.stock){
                    purchaseProducts
                }
                else{
                    rejectedProducts
                }
            }

            const newTicket = {
                code,
                purchase_datatime: new Date(),
                amount,
                purchaser: req.user.email
            }

            const ticketCreted = await TicketsService.createTickets(newTicket)
        }
        catch (error) {
            console.log(error.message)
            res.json({status: "Error", message: error})
        }
    }
}
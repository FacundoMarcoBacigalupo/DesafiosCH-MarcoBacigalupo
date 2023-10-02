import { ticketsModel } from '../../models/tickets.model.js'



export class TicketsMongo{
    constructor (){
        this.model = ticketsModel
    }


//Eliminar un ticket
    async createTicket (ticketInfo){
        try {
            const createdTicket = await this.model.create(ticketInfo)
            return createdTicket
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with created the ticket")
        }
    }



//Obtener un ticket by Id
    async getTicketById (ticketId){
        try {
            const ticket = await this.model.findById(ticketId)
            return ticket
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with created the ticket")
        }
    }



//Eliminar un ticket
    async deleteTicket (ticketId){
        try {
            const ticket = await this.model.findById(ticketId)
            if(ticket){
                await this.model.findByIdAndDelete(ticket)
                return ticket
            }
        }
        catch (error) {
            console.log(error.message)
            throw new Error("Error with deleted the ticket")
        }
    }
}
import  { ticketsDao } from '../dao/factory.js';

export class TicketsService{
    static createTickets = async(ticketInfo) =>{
        return await ticketsDao.createTicket(ticketInfo)
    }
}
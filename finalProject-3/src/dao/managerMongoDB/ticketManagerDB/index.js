import ticketModel from '../../models/ticket.models.js'

class TicketManager {

    createTicket = async (id, body) => {return await ticketModel.create(id, body)}
}

export default TicketManager
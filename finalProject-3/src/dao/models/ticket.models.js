import mongoose from 'mongoose'

const ticketCollection = 'ticket'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {
        timestamps: true
    },
    amount: Number,
    purchaser: {
        type:  mongoose.Schema.Types.email,
        ref: 'users'
    }
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel
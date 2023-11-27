import mongoose from 'mongoose'

const cartsCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    require: true,
                    min: 1
                }
            }
        ],
        default: []
    }
})

const cartsModel = mongoose.model(cartsCollection, cartSchema)

export default cartsModel

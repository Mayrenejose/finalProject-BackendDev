import cartsMoldel from '../../models/carts.models.js'
import ProductManager from '../productManager/index.js'

class CartManager {

    static getAllCarts = async() => {
        try{
            const getCarts = await cartsMoldel.find()
            return getCarts
        } catch (error) {
            return console.log(error)
        }
    }

    static getCartById = async(cid) => {
        try{
            const cartId = await cartsMoldel.findById(cid)
            return cartId
        } catch (error) {
            return console.log(error)
        }
    }

    static addCart = async(products) => {
        try{
            const newCart = await cartsMoldel.create(products)
            return newCart

        } catch {
            console.log(error, 'cart creation failed')
            throw new Error('error')
        }
    }
    
    static addProductToCart = async(idCart, idProduct) => {
        try {
            const cart = await this.getCartById(idCart)
            const product = await ProductManager.getProductById(idProduct)
            const searchIdCart = cart._id == idCart ? true : false
            const searchIdProduct = cart.products.find(
                (product) => product._id.toString() === idProduct
            )

            if ( product.length === 0 ) throw new Error('the product does not exist')
            if ( !searchIdCart ) throw new Error('the car does not exist')

            if ( !searchIdProduct ) {
                const newProductToCart = {
                    _id: idProduct,
                    quantity: 1
                }
                cart.products.push(newProductToCart)
            } else {
                searchIdProduct.quantity++
            }

            await cart.save()
            return cart

        } catch (error) {
            console.log(error, 'The product was not added to the cart')
            throw new Error('error')
        }
    }
}

export default CartManager
import fs from 'fs'

class CartManager {

    constructor() {
        this.cart = []
        this.nextId = 1
        this.path = './src/data/dataCart.json'
    }

    getAllCarts = async() => {
        try{
            if( !fs.existsSync(this.path) ) return []
            const db = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(db)
        } catch (error) {
            return console.log(error)
        }
    }

    getCartById = async(cid) => {
        try{
            const allData = await this.getAllCarts()
            return allData.find(cart => cart.id === cid)

        } catch (error) {
            return console.log(error)
        }
    }

    addCart = async(products = []) => {
        try{
            if (!Array.isArray(products)) throw new Error('error in type')

            const newCart = {
                id: this.nextId,
                products
            }

            this.cart.push(newCart)
            this.nextId++

            await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))

        } catch {
            console.log(error, 'cart creation failed')
            throw new Error('error')
        }
    }
}

// const startUp = async() => {
//     const cartManager = new CartManager()
//     await cartManager.addCart([{hola: 'hoa', que: 'quetal'}, {hola: 'hoggga', que: 'quffetal'}])
//     await cartManager.addCart([{hola: 'hfhgdgdfoa', que: 'quetffal'}, {hola: 'hoggga', que: 'quffetal'}])
//     await cartManager.addCart([{hola: 'hdfgfsdfoa', que: 'qfffuetal'}])
//     await cartManager.addCart([{hola: 'hoggga', que: 'quffetal'}])
//  }

// startUp()
// console.log('hola');

export default CartManager
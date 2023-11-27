import { Router } from 'express'
import CartManager from '../../dao/managerMongoDB/cartManagerDB/index.js'

const router = Router()

router.get('/', async(req, res) => {
    try{
        const allDataCarts = await CartManager.getAllCarts()
        res.status(200).json({data: allDataCarts})
    } catch (error) {
        res.status(400).send({message: 'error getting carts'})
    }
})

router.get('/:cid', async(req, res) => {
    try{
        const { cid } = req.params
        const cartById = await CartManager.getCartById(cid)
        res.json({data: cartById})
    } catch (error) {
        res.status(400).send({message: 'error getting carts'})
    }
})

router.post('/', async(req, res) => {
    try {
        const bodyGet = req.body
        await CartManager.addCart(bodyGet)
        return res.status(200).json({ message: 'cart successfully added' })

    } catch(error) {
        res.status(400).send({error: 'error adding cart'})
    }
})

router.post('/:cid/product/:pid', async(req, res) => {
    try {
        const idCart = req.params.cid
        const idProduct = req.params.pid
        await CartManager.addProductToCart(idCart, idProduct)
        
        return res.status(200).json({ message: 'product successfully added' })

    } catch(error) {
        res.status(400).send({error: 'error adding product'})
    }
})


export default router
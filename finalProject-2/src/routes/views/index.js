import { Router } from 'express'
import ProductManager from '../../dao/managerMongoDB/productManager/index.js'

const router = Router()

router.get('/chat', async(req, res) => {
    try {
        res.render('chat', {
            //dataProducts,
            style: 'index.css',
            title: 'Chat'
        })

    } catch {
        res.status(500).send({error: 'error saving message'})
    }
})

router.get('/:site', async(req, res) => {
    try {
        const params = req.params?.site
        const renderParameter = params === 'home' ? 'home' : 'realTimeProducts'
        const dataProducts = await ProductManager.getAllProducts()
        
        res.render(renderParameter, {
            dataProducts,
            style: 'index.css',
            title: 'All products'
        })

    } catch (error) {
        res.status(500).send({error :'error getting products'})
    }
})

export default router
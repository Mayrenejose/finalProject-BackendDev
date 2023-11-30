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

router.get('/products', async(req, res) => {
    try {
        const limit = parseInt(req.query?.limit ?? 10)
        const page = parseInt(req.query?.page ?? 1)
        const query = req.query?.query ?? ''
        const stock = req.query?.stock ?? false
        const previousPage = req.get('Referer')
        const currentUrl = `${req.protocol}://${req.get('host')}`

        const dataProducts = await ProductManager.getAllProducts(
            limit, 
            page,
            query,
            previousPage,
            currentUrl,
            stock
        )

        res.render('products', {
            dataProducts,
            style: 'index.css',
            title: 'All products'
        })

    } catch (error) {
        res.status(500).send({status:'error'})
    }
})

router.get('/:site', async(req, res) => {
    try {
        const params = req.params?.site
        const limit = parseInt(req.query?.limit ?? 2)
        const page = parseInt(req.query?.page ?? 1)
        const query = req.query?.query ?? ''
        const renderParameter = params === 'home' ? 'home' : 'realTimeProducts'
        const dataProducts = await ProductManager.getAllProducts(
            limit, 
            page,
            query,
        )
        
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
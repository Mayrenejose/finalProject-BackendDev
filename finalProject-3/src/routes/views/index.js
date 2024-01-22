import { Router } from 'express'
import ProductManager from '../../dao/managerMongoDB/productManager/index.js'
import messageModel from '../../dao/models/messages.models.js'
import sessionAct from '../../middleware/session/index.js'
import authe from '../../middleware/auth/index.js'

const router = Router()

router.get('/', sessionAct, async(req, res) => {
    try { 
        return res.redirect('/login')

    } catch (error) {
        res.status(500).send({error :'error'})
    }
})

router.get('/register', sessionAct, async(req, res) => {
    try {        
        res.render('register', {
            style: 'index.css',
            title: 'Registro'
        })

    } catch (error) {
        res.status(500).send({error :'error'})
    }
})

router.get('/login', sessionAct, async(req, res) => {
    try {      
        res.render('login', {
            style: 'index.css',
            title: 'Login'
        })

    } catch (error) {
        res.status(500).send({error :'error'})
    }
})

router.get('/chat', async(req, res) => {
    try {
        const allUsers = await messageModel.find()        
        res.render('chat', {
            allUsers,
            style: 'index.css',
            title: 'Chat'
        })

    } catch {
        res.status(500).send({error: 'error'})
    }
})

router.get('/chat/:id', async(req, res) => {
    try {
        const idUser = req.params?.id
        const userInformation = await messageModel.findById(idUser)
        const email = userInformation.email
        const textMsj = userInformation.message
                
        res.render('chatId', {
            email,
            textMsj,
            idUser,
            style: 'index.css',
            title: 'Chat'
        })

    } catch {
        res.status(500).send({error: 'error'})
    }
})

router.get('/products', authe, async(req, res) => {
    try {
        const user = req.session?.user
        const limit = parseInt(req.query?.limit ?? 10)
        const page = parseInt(req.query?.page ?? 1)
        const query = req.query?.query ?? ''
        const sort = req.query?.sort
        const category = req.query.category ?? ''
        const previousPage = req.get('Referer')
        const currentUrl = `${req.protocol}://${req.get('host')}`        
       
        const dataProducts = await ProductManager.getAllProducts(
            limit, 
            page,
            query,
            previousPage,
            currentUrl,
            sort,
            category
        )

        res.render('products', {
            dataProducts,
            user,
            style: 'index.css',
            title: 'All products'
        })

    } catch (error) {
        res.status(500).send({status:'error'})
    }
})

router.get('/product/:_id', async(req, res) => {
    try {   
        const idProduct = req.params?._id
        const infoProduct = await ProductManager.getProductById(idProduct)
        const titleProduct = infoProduct.title
        const image = infoProduct.thumbnails
        const description = infoProduct.description
        const priceProduct = infoProduct.price
        const categoryProduct = infoProduct.category
        const stockProduct = infoProduct.stock
        
        res.render('product', {
            titleProduct,
            image,
            description,
            priceProduct,
            categoryProduct,
            stockProduct,
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
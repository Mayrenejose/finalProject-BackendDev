import { Router } from 'express'
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from '../../controllers/product/index.js'

const router = Router()

router.get('/', getAllProducts)
router.get('/:pid', getProductById) 
router.post('/', addProduct) 
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)  

export default router
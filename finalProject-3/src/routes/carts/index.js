import { Router } from 'express'
import {
    getAllCarts,
    getCartById,
    addCart,
    addProductToCart,
    deleteAllProducts,
    deleteProduct,
    updateProductsInCart,
    updateQuantityInCart
} from '../../controllers/cart/index.js'

const router = Router()

router.get('/', getAllCarts)
router.get('/:cid', getCartById) 
router.post('/', addCart) 
router.post('/:cid/product/:pid', addProductToCart) 
router.delete('/:cid', deleteAllProducts)
router.delete('/:cid/product/:pid', deleteProduct)
router.put('/:cid', updateProductsInCart)
router.put('/:cid/product/:pid', updateQuantityInCart)

export default router
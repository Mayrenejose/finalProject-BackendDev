import { 
    Cart, 
    Products,
    Chat 
} from '../dao/factory.js' 

import CartRepository from './cart/index.js'
import ProductRepository from './product/index.js'
import ChatRepository from './chat/index.js'

export const CartService = new CartRepository(new Cart())
export const ProductService = new ProductRepository(new Products())
export const ChatService = new ChatRepository(new Chat())
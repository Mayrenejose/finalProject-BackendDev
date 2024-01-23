import { 
    Cart, 
    Products,
    Chat,
    User 
} from '../dao/factory.js' 

import CartRepository from './cart/index.js'
import ProductRepository from './product/index.js'
import ChatRepository from './chat/index.js'
import UserRepository from './user/index.js'

export const CartService = new CartRepository(new Cart())
export const ProductService = new ProductRepository(new Products())
export const ChatService = new ChatRepository(new Chat())
export const UserService = new UserRepository(new User())
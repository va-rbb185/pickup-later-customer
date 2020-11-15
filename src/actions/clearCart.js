import { cart as clearedCart } from '../store/initialState';
import { CLEAR_CART } from './types';

const clearCart = () => ({
    type: CLEAR_CART,
    cart: clearedCart
});

export default clearCart;

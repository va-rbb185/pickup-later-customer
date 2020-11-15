import { cart } from '../store/initialState';
import { CLEAR_CART } from './types';

const clearCart = () => ({
    type: CLEAR_CART,
    cart
});

export default clearCart;

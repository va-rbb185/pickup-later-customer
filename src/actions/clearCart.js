import { CLEAR_CART } from './types';

const clearCart = () => ({
    type: CLEAR_CART,
    cart: {
        amount: 0,
        items: []
    }
});

export default clearCart;

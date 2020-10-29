import { REMOVE_CART_ITEM } from './types';

const removeCartItem = product => ({
    type: REMOVE_CART_ITEM,
    product
});

export default removeCartItem;

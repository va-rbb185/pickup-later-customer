import { ADD_CART_ITEM } from './types';

const addCartItem = product => ({
    type: ADD_CART_ITEM,
    product
});

export default addCartItem;

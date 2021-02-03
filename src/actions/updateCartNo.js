import { UPDATE_CART_NUMBER } from './types';

const updateCartNo = cartNo => ({
    type: UPDATE_CART_NUMBER,
    cartNo
});

export default updateCartNo;

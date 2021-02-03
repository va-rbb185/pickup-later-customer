import { UPDATE_AUTH_CART_NUMBER } from './types';

const updateAuthCartNo = cartNo => ({
    type: UPDATE_AUTH_CART_NUMBER,
    cartNo
});

export default updateAuthCartNo;

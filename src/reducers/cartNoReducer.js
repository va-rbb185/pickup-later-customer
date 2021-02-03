import { UPDATE_CART_NUMBER } from '../actions/types';

const cartNoReducer = (prevState = '', action) => {
    switch (action.type) {
        case UPDATE_CART_NUMBER:
            return action.cartNo;
        default:
            return prevState;
    }
};

export default cartNoReducer;

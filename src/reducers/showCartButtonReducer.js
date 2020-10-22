import {
    SHOW_CART_BUTTON,
    HIDE_CART_BUTTON
} from '../actions/types';

export default (previousState = true, action) => {
    switch (action.type) {
        case SHOW_CART_BUTTON:
            return true;
        case HIDE_CART_BUTTON:
            return false;
        default:
            return previousState;
    }
};

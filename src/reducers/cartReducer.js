import { cart as initialCart } from '../store/initialState';
import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    RETRIEVE_CART_FROM_STORAGE,
    CLEAR_CART,
    GET_CART_SUCCESS,
    GET_CART_FAILURE,
    CREATE_CART_SUCCESS,
    CREATE_CART_FAILURE,
    UPDATE_CART_SUCCESS,
    UPDATE_CART_FAILURE
} from '../actions/types';

const cartReducer = (prevState = initialCart, action) => {
    const nextState = { ...prevState };
    let existingItem;

    switch (action.type) {
        case ADD_CART_ITEM:
            existingItem = nextState.items.find(item => item.product.id === action.product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                nextState.items.push({
                    quantity: 1,
                    product: action.product
                });
            }
            nextState.amount += 1;
            return nextState;

        case REMOVE_CART_ITEM:
            existingItem = nextState.items.find(item => item.product.id === action.product.id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    nextState.items = nextState.items.filter(item => item.product.id !== existingItem.product.id);
                }
                nextState.amount -= 1;
                return nextState;
            }
            return prevState;

        case CLEAR_CART:
            return action.cart;

        case RETRIEVE_CART_FROM_STORAGE:
            return action.cart;

        case GET_CART_SUCCESS:
            return action.cart;

        case GET_CART_FAILURE:
            return prevState;

        case CREATE_CART_SUCCESS:
            return action.cart;

        case CREATE_CART_FAILURE:
            return prevState;

        case UPDATE_CART_SUCCESS:
            return action.cart;

        case UPDATE_CART_FAILURE:
            return prevState;

        default:
            return prevState;
    }
};

export default cartReducer;

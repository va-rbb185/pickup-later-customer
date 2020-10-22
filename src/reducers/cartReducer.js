import { cart as initialCart } from '../store/initialState';
import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM
} from '../actions/types';

export default (previousState = initialCart, action) => {
    const newState = { ...previousState };
    let existingItem;

    switch (action.type) {
        case ADD_CART_ITEM:
            existingItem = newState.items.find(item => item.product.id === action.product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                newState.items.push({
                    quantity: 1,
                    product: action.product
                });
            }
            newState.amount += 1;
            return newState;

        case REMOVE_CART_ITEM:
            existingItem = newState.items.find(item => item.product.id === action.product.id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    newState.items = newState.items.filter(item => item.product.id !== existingItem.product.id);
                }
                newState.amount -= 1;
                return newState;
            }
            return previousState;

        default:
            return previousState;
    }
};

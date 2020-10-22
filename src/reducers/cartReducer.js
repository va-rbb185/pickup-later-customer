import { cart as initialCart } from '../json';
import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM
} from '../actions/types';

export default (previousState = initialCart, action) => {
    const newState = { ...previousState };
    let { amount, items } = newState;
    let existingItem;

    switch (action.type) {
        case ADD_CART_ITEM:
            existingItem = items.find(item => item.product.id === action.product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                items.push({
                    quantity: 1,
                    product: action.product
                });
            }
            amount += 1;
            return newState;

        case REMOVE_CART_ITEM:
            existingItem = items.find(item => item.product.id === action.product.id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    items = items.filter(item => item.product.id !== existingItem.product.id);
                }
                amount -= 1;
                return newState;
            }
            return previousState;

        default:
            return previousState;
    }
};

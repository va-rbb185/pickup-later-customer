import { paymentMethod } from '../store/initialState';
import { UPDATE_PAYMENT_METHOD } from '../actions/types';

const paymentMethodReducer = (prevState = paymentMethod, action) => {
    switch (action.type) {
        case UPDATE_PAYMENT_METHOD:
            return action.paymentMethod;
        default:
            return prevState;
    }
};

export default paymentMethodReducer;

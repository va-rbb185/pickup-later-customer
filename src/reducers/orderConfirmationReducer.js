import {
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE
} from '../actions/types';

const orderConfirmationReducer = (prevState = null, action) => {
    switch (action.type) {
        case CREATE_ORDER_START:
            return prevState;
        case CREATE_ORDER_SUCCESS:
            return action.orderConfirmation;
        case CREATE_ORDER_FAILURE:
            return prevState;
        default:
            return prevState;
    }
};

export default orderConfirmationReducer;

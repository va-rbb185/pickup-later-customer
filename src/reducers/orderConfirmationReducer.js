import {
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    RETRIEVE_ORDER_CONFIRMATION_FROM_STORAGE,
    DELETE_ORDER_CONFIRMATION
} from '../actions/types';

const orderConfirmationReducer = (prevState = null, action) => {
    switch (action.type) {
        case CREATE_ORDER_START:
            return prevState;
        case CREATE_ORDER_SUCCESS:
            return action.orderConfirmation;
        case CREATE_ORDER_FAILURE:
            return action.error;
        case RETRIEVE_ORDER_CONFIRMATION_FROM_STORAGE:
            return action.orderConfirmation;
        case DELETE_ORDER_CONFIRMATION:
            return null;
        default:
            return prevState;
    }
};

export default orderConfirmationReducer;

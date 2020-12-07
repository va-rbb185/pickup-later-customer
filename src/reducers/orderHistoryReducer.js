import {
    FETCH_ORDER_HISTORY_START,
    FETCH_ORDER_HISTORY_SUCCESS,
    FETCH_ORDER_HISTORY_FAILURE
} from '../actions/types';

const orderHistoryReducer = (prevState = null, action) => {
    switch (action.type) {
        case FETCH_ORDER_HISTORY_START:
            return prevState;
        case FETCH_ORDER_HISTORY_SUCCESS:
            return action.orderHistory;
        case FETCH_ORDER_HISTORY_FAILURE:
            return prevState;
        default:
            return prevState;
    }
};

export default orderHistoryReducer;

import {
    UPDATE_ONGOING_ORDER,
    DELETE_ONGOING_ORDER,
    RETRIEVE_ONGOING_ORDER_FROM_STORAGE
} from '../actions/types';

const ongoingOrderReducer = (prevState = null, action) => {
    switch (action.type) {
        case UPDATE_ONGOING_ORDER:
            let nextState = { ...prevState };
            Object.keys(action.ongoingOrder).forEach(key => {
                if (action.ongoingOrder[key]) {
                    nextState[key] = action.ongoingOrder[key];
                }
            });
            return nextState;

        case RETRIEVE_ONGOING_ORDER_FROM_STORAGE:
            return action.ongoingOrder;

        case DELETE_ONGOING_ORDER:
            return null;

        default:
            return prevState;
    }
};

export default ongoingOrderReducer;

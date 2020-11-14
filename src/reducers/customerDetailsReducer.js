import { customerDetails } from '../store/initialState';
import { UPDATE_CUSTOMER_DETAILS } from '../actions/types';

const customerDetailsReducer = (prevState = customerDetails, action) => {
    switch (action.type) {
        case UPDATE_CUSTOMER_DETAILS:
            return action.customerDetails;
        default:
            return prevState;
    }
};

export default customerDetailsReducer;

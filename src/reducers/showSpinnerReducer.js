import {
    SHOW_SPINNER,
    HIDE_SPINNER
} from '../actions/types';

const showSpinnerReducer = (previousState = false, action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return true;
        case HIDE_SPINNER:
            return false;
        default:
            return previousState;
    }
};

export default showSpinnerReducer;

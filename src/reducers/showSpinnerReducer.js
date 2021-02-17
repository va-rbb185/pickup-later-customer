import {
    SHOW_SPINNER,
    HIDE_SPINNER
} from '../actions/types';

const showSpinnerReducer = (prevState = false, action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return true;
        case HIDE_SPINNER:
            return false;
        default:
            return prevState;
    }
};

export default showSpinnerReducer;

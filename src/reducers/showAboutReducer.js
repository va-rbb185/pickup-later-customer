import { SHOW_ABOUT, HIDE_ABOUT } from '../actions/types';

const showAboutReducer = (prevState = false, action) => {
    switch (action.type) {
        case SHOW_ABOUT:
            return true;
        case HIDE_ABOUT:
            return false;
        default:
            return prevState;
    }
};

export default showAboutReducer;

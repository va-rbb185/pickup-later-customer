import { storeMenu } from '../store/initialState';
import {
    UPDATE_MENU,
    FETCH_MENU_START,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE
} from '../actions/types';

const menuReducer = (previousState = storeMenu, action) => {
    switch (action.type) {
        case UPDATE_MENU:
            return action.menu;
        case FETCH_MENU_START:
            return previousState;
        case FETCH_MENU_SUCCESS:
            return action.menu;
        case FETCH_MENU_FAILURE:
            return previousState;
        default:
            return previousState;
    }
};

export default menuReducer;

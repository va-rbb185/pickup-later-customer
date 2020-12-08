import { storeMenu } from '../store/initialState';
// import { storeMenu } from '../json';
import {
    UPDATE_MENU,
    FETCH_MENU_START,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE
} from '../actions/types';

const menuReducer = (prevState = storeMenu, action) => {
    switch (action.type) {
        case UPDATE_MENU:
            return action.menu;
        case FETCH_MENU_START:
            return prevState;
        case FETCH_MENU_SUCCESS:
            if (!action.menu.error) {
                return action.menu;
            }
            return prevState;
        case FETCH_MENU_FAILURE:
            return prevState;
        default:
            return prevState;
    }
};

export default menuReducer;

import { combineReducers } from 'redux';
// import { storeMenu as initialMenu } from '../static/resources';
import {
    UPDATE_MENU,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE
} from '../actions/types';

const menuReducer = (previousMenu = {}, action) => {
    switch (action.type) {
        case UPDATE_MENU:
            console.info('Menu updated:', action.payload.menu);
            return action.payload.menu;

        case FETCH_MENU_SUCCESS:
            console.info('Menu fetching succeeded:', action.payload.menu);
            return action.payload.menu;

        case FETCH_MENU_FAILURE:
            console.error('Menu fetching failed:', action.payload.error);
            return previousMenu;

        default:
            return previousMenu;
    }
};

export default combineReducers({
    storeMenu: menuReducer
});

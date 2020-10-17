import { combineReducers } from 'redux';
import { storeMenu as initialMenu } from '../static/resources';
import {
    UPDATE_MENU,
    FETCH_MENU_START,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE,
    FETCH_MENU_END
} from '../actions/types';

const menuReducer = (menu = initialMenu, action) => {
    switch (action.type) {
        case UPDATE_MENU:
            return action.payload;
        case FETCH_MENU_START:
            console.log('Menu fetching started.');
            return menu;
        case FETCH_MENU_SUCCESS:
            console.log('Menu fetching succeeded.');
            return action.payload;
        case FETCH_MENU_FAILURE:
            console.log('Menu fetching failed:', action.payload);
            return menu;
        case FETCH_MENU_END:
            console.log('Menu fetching ended.');
            return menu;
        default:
            return menu;
    }
};

export default combineReducers({
    storeMenu: menuReducer
});

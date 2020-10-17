import { fetchStoreMenu } from '../api';
import {
    UPDATE_MENU,
    FETCH_MENU_START,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE,
    FETCH_MENU_END
} from './types';

const fetchMenuStart = () => ({ type: FETCH_MENU_START });

const fetchMenuSuccess = (response) => ({
    type: FETCH_MENU_SUCCESS,
    payload: response
});

const fetchMenuFailure = (error) => ({
    type: FETCH_MENU_FAILURE,
    payload: error
});

const fetchMenuEnd = () => ({ type: FETCH_MENU_END });

export const updateStoreMenu = menu => {
    return {
        type: UPDATE_MENU,
        payload: menu
    };
};

/* export const fetchMenu = () => async (dispatch, getState) => {
    const response = await fetchStoreMenu();
    dispatch(fetchMenuSuccess(response));
}; */

export const fetchMenu = () => dispatch => {
    fetchStoreMenu()
        .then(response => dispatch(fetchMenuSuccess(response)))
        .catch(error => dispatch(fetchMenuFailure(error)));
};

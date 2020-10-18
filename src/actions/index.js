import { fetchStoreMenu } from '../api';
import {
    UPDATE_MENU,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE
} from './types';

const fetchMenuSuccess = (response) => ({
    type: FETCH_MENU_SUCCESS,
    payload: {
        menu: response,
        error: null
    }
});

const fetchMenuFailure = (error) => ({
    type: FETCH_MENU_FAILURE,
    payload: {
        menu: null,
        error
    }
});

export const updateMenu = menu => ({
    type: UPDATE_MENU,
    payload: { menu }
});

export const fetchMenu = () => dispatch => {
    fetchStoreMenu()
        .then(response => {
            const successAction = fetchMenuSuccess(response);
            dispatch(successAction);
        })
        .catch(error => {
            const failureAction = fetchMenuFailure(error);
            dispatch(failureAction);
        });
};

import { loginStatus, userTypes } from '../enums';

export const storeMenu = {
    storeId: null,
    name: null,
    phoneNumber: null,
    address: null,
    groups: []
};

export const cart = {
    amount: 0,
    items: []
};

export const authentication = {
    login: { status: loginStatus.NOT_LOGGED_IN },
    user: { type: userTypes.GUEST }
};

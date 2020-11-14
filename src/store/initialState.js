import { loginStatus, userTypes, paymentMethods } from '../enums';

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

export const customerDetails = {
    name: '',
    phone: '',
    note: ''
}

export const paymentMethod = paymentMethods.COD.stringValue;

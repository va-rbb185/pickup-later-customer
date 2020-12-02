import { LoginStatus, UserType, PaymentMethod } from '../enums';

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
    login: { status: LoginStatus.NOT_LOGGED_IN },
    user: { type: UserType.GUEST }
};

export const customerDetails = {
    name: '',
    phone: '',
    note: ''
}

export const paymentMethod = PaymentMethod.COD.value;

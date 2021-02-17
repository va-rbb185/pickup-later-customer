import { schemes, httpMethods, headers } from './staticEntries';

const scheme = schemes.HTTPS;
const host = 'fb9bc91edfa0.ngrok.io';
const basePath = '/api/v1';

function toQueryString(params) {
    if (typeof params !== 'object') return '';
    const keys = Object.keys(params);
    if (keys.length === 0) return '';
    return '?' + keys.map(key => `${key}=${encodeURIComponent(`${params[key]}`)}`).join('&');
};

function getApiPath(path, params = null) {
    let apiPath = scheme + host + basePath + path;
    if (params) {
        const type = typeof params;

        if (type === 'number' || type === 'string') {
            apiPath += `/${params}`;
        }

        if (type === 'object') {
            const queryString = toQueryString(params);
            apiPath += queryString;
        }
    }
    return apiPath;
}

function getConfigurations(method, data = null, token = null) {
    let configurations = {
        method,
        headers
    };

    if (data) {
        configurations.body = JSON.stringify(data);
    }

    if (token && typeof token === 'string') {
        configurations.headers['Authorization'] = token;
    }

    return configurations;
}

export const fetchStores = async () => {
    const apiPath = getApiPath('/stores');
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const fetchStoreMenu = async storeToken => {
    const apiPath = getApiPath('/menu');
    let configurations = getConfigurations(httpMethods.GET, null, storeToken);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const authenticatePhone = async phoneNumber => {
    const apiPath = getApiPath('/customers/phone_login');
    const configurations = getConfigurations(httpMethods.POST, { phoneNumber });
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const authenticateOtp = async (phoneNumber, otp) => {
    const apiPath = getApiPath('/customers/verify_code');
    const configurations = getConfigurations(httpMethods.POST, {
        phoneNumber,
        codeVerify: otp
    });
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const createOrder = async order => {
    const apiPath = getApiPath('/orders');
    const configurations = getConfigurations(httpMethods.POST, order);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const fetchOrdersByUser = async (userId, params) => {
    const apiPath = getApiPath(`/users/${userId}/orders`, params);
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const fetchOrder = async orderId => {
    const apiPath = getApiPath(`/orders/${orderId}`);
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const productSearch = async query => {
    const apiPath = getApiPath('/search_product', { keyword: query });
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const updateOrder = async orderData => {
    const apiPath = getApiPath('/orders');
    const configurations = getConfigurations(httpMethods.PUT, orderData);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const getCart = async cartNo => {
    const apiPath = getApiPath(`/carts/${cartNo}`);
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const createCart = async superCart => {
    const apiPath = getApiPath('/carts');
    const configurations = getConfigurations(httpMethods.POST, superCart);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const updateCart = async (cartNo, cartObject) => {
    const apiPath = getApiPath(`/carts/${cartNo}`);
    const configurations = getConfigurations(httpMethods.PUT, cartObject);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const getVouchersOfUser = async userId => {
    const apiPath = getApiPath(`/customers/${userId}/vouchers`);
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const verifyVoucher = async voucherData => {
    const apiPath = getApiPath('/vouchers/verify');
    const configurations = getConfigurations(httpMethods.POST,  voucherData);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
}

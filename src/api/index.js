import { schemes, httpMethods, headers } from './staticEntries';

const scheme = schemes.HTTPS;
const host = 'e4772e04388b.ap.ngrok.io';
const basePath = '/api/v1';
const paths = {
    get: {
        menu: '/menu',
        users: '/users',
        orders: '/orders',
        productSearch: '/search_product'
    },
    post: {
        authPhone: '/customers/phone_login',
        authOtp: '/customers/verify_code',
        createOrder: '/orders'
    }
};

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

function getConfigurations(method, data = null) {
    let configurations = {
        method,
        headers
    };
    if (data) {
        configurations.body = JSON.stringify(data);
    }
    return configurations;
}

export const fetchStoreMenu = async () => {
    const apiPath = getApiPath(paths.get.menu);
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const authenticatePhone = async phoneNumber => {
    const apiPath = getApiPath(paths.post.authPhone);
    const configurations = getConfigurations(httpMethods.POST, { phoneNumber });
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const authenticateOtp = async (phoneNumber, otp) => {
    const apiPath = getApiPath(paths.post.authOtp);
    const configurations = getConfigurations(
        httpMethods.POST,
        {
            phoneNumber,
            codeVerify: otp
        }
    );
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const createOrder = async order => {
    const apiPath = getApiPath(paths.post.createOrder);
    const configurations = getConfigurations(httpMethods.POST, order);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const fetchOrdersByUser = async (userId, params) => {
    const apiPath = getApiPath(`${paths.get.users}/${userId}/orders`, params);
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const fetchOrder = async orderId => {
    const apiPath = getApiPath(paths.get.orders, orderId);
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

export const productSearch = async query => {
    const apiPath = getApiPath(paths.get.productSearch, { keyword: query });
    const configurations = getConfigurations(httpMethods.GET);
    const response = await fetch(apiPath, configurations);
    const data = await response.json();
    return data;
};

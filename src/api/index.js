import { schemes, httpMethods, jsonHeaders } from './staticEntries';

const scheme = schemes.HTTPS;
const host = 'a9b00a2a6236.ngrok.io';
const basePath = '/api/v1';
const paths = {
    get: {
        menu: '/menu',
        test: '/posts/1'
    },
    post: {
        authPhone: '/customers/phone_login',
        authOtp: '/customers/verify_code',
        createOrder: '/orders'
    }
};

function getApiPath(path, param = null) {
    let apiPath = scheme + host + basePath + path;
    if (param) {
        apiPath += param;
    }
    return apiPath;
}

function getConfigurations(method, data = null) {
    let configurations = {
        method: method,
        headers: jsonHeaders
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

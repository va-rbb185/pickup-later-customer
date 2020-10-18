import { schemes, httpMethods, jsonHeaders } from './staticEntries';

const scheme = schemes.HTTPS;
const host = 'e85dc8bb08ec.ap.ngrok.io';
const basePath = '/api/v1';
// const host = 'jsonplaceholder.typicode.com';
// const basePath = '';
const paths = {
    get: {
        menu: '/menu',
        test: '/posts/1'
    },
    post: {}
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
}

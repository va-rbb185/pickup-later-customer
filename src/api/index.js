import { schemes, httpMethods } from './staticEntries';

const scheme = schemes.HTTP;
// const host = '05d3652e891e.ngrok.io';
const host = 'jsonplaceholder.typicode.com';
// const basePath = '/api/v1';
const basePath = '';
const paths = {
    get: {
        menu: '/menu',
        test: '/posts/1'
    },
    post: {}
};

function getApiPath(path, param) {
    let apiPath = scheme + host + basePath + path;
    if (param) {
        apiPath += param;
    }
    return apiPath;
}

function getConfig(method, data) {
    let configObj = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    if (data) {
        configObj.body = JSON.stringify(data);
    }
    return configObj;
}

const fetchData = async (apiPath, config) => {
    let response;
    if (config) {
        response = await fetch(apiPath, config);
    } else {
        response = await fetch(apiPath);
    }
    const data = await response.json();
    return data;
}

export const fetchStoreMenu = async () => {
    const path = getApiPath(paths.get.test);
    const config = getConfig(httpMethods.GET);
    const data = await fetchData(path, config);
    return data;
}

/* export const getCollegeByCode = async code => {
    const path = getApiPath(paths.get.college.byCode, code);
    const data = await fetchData(path);
    return data;
}

export async function getMajorScoresFromCollege(collegeDTO) {
    const path = getApiPath(paths.post.college.majorScores);
    const config = getConfig('POST', collegeDTO);

    const data = await fetchData(path, config);
    return data;
}

const example = {
    getCollegeByCode: async function (code) {
        const path = getApiPath(paths.get.college.byCode, code);
        const data = await fetchData(path);
        return data;
    },

    findCollegesByName: async function (name) {
        const path = getApiPath(paths.get.college.byName, name);
        const data = await fetchData(path);
        return data;
    },

    getCollegesByProvince: async function (provinceCode) {
        const path = getApiPath(paths.get.college.byProvince, provinceCode);
        const data = await fetchData(path);
        return data;
    },

    getCollegesByGroupCode: async function (groupCode) {
        const path = getApiPath(paths.get.college.byGroupCode, groupCode);
        const data = await fetchData(path);
        return data;
    },

    getAllMajors: async function () {
        const path = getApiPath(paths.get.major.all);
        const data = await fetchData(path);
        return data;
    },

    getMajorByCode: async function (code) {
        const path = getApiPath(paths.get.major.byCode, code);
        const data = await fetchData(path);
        return data;
    },

    findMajorsByName: async function (name) {
        const path = getApiPath(paths.get.major.byName, name);
        const data = await fetchData(path);
        return data;
    },

    getMajorsByGroupCode: async function (groupCode) {
        const path = getApiPath(paths.get.major.byGroupCode, groupCode);
        const data = await fetchData(path);
        return data;
    },

    getYears: async function () {
        const path = getApiPath(paths.get.years);
        const data = await fetchData(path);
        return data;
    },

    getAllGroupCodes: async function () {
        const path = getApiPath(paths.get.groupCodes.all);
        const data = await fetchData(path);
        return data;
    },

    getGroupCodesByCollegeAndMajor: async function (collegeCode, majorCode) {
        const path = getApiPath(paths.get.groupCodes.byCollegeMajor, collegeCode) + '/' + majorCode;
        const data = await fetchData(path);
        return data;
    },

    getCollegeScoresByMajor: async function (majorDTO) {
        const path = getApiPath(paths.post.major.collegeScores);
        const config = getConfig('POST', majorDTO);

        const data = await fetchData(path, config);
        return data;
    },

    compareMajorScoreBetweenColleges: async function (compareDTO) {
        const path = getApiPath(paths.post.major.compare);
        const config = getConfig('POST', compareDTO);

        const data = await fetchData(path, config);
        return data;
    },

    predictMajorScore: async function (guessDTO) {
        const path = getApiPath(paths.post.predictMajorScore);
        const config = getConfig('POST', guessDTO);

        const data = await fetchData(path, config);
        return data;
    },

    getMajorScoreOverYears: async function (majorCollegeDTO) {
        const path = getApiPath(paths.post.majorScoreOverYears);
        const config = getConfig('POST', majorCollegeDTO);

        const data = await fetchData(path, config);
        return data;
    },

    getAllProvinces: async function () {
        const path = getApiPath(paths.get.provinces.all);
        const data = await fetchData(path);
        return data;
    },

    getProvinceById: async function (id) {
        const path = getApiPath(paths.get.provinces.byId, id);
        const data = await fetchData(path);
        return data;
    },

    findProvince: async function (name) {
        const path = getApiPath(paths.get.provinces.find, name);
        const data = await fetchData(path);
        return data;
    }
}; */

const getParamFromURL = (url, param) => {
    const urlObj = new URL(url);
    const paramValue = urlObj.searchParams.get(param);
    return paramValue;
};

export default getParamFromURL;

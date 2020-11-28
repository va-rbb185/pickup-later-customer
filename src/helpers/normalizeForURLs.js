const normalizeForURLs = str => {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f!@%^*+=<>?/,.:;'"`&#~$|(){}\[\]\\]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[_\s]/g, '-')
        .toLowerCase();
};

export default normalizeForURLs;

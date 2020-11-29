const normalizeForURLs = (textToNormalize) => {
    return textToNormalize.trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f!@%^*+=<>?,.:;'"`&#~$|(){}[\]\\]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[/_\s]/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase();
};

export default normalizeForURLs;

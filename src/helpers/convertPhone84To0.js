const convertPhone84To0 = phoneNumber => {
    if (phoneNumber && typeof phoneNumber === 'string') {
        if (phoneNumber[0] !== '0') {
            return '0' + phoneNumber.substring(3);
        }
        return phoneNumber;
    }
    return null;
};

export default convertPhone84To0;

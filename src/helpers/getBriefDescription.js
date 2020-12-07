const getBriefDescription = items => {
    const firstProductName = items[0].productName;
    const remainingCount = items.length - 1;
    let text = firstProductName;
    if (remainingCount > 0) {
        text += ` + ${remainingCount} sản phẩm khác`;
    }
    return text;
};

export default getBriefDescription;

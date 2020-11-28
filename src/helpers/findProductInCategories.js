const findProductInCategories = (productIdToFind, categories) => {
    let foundProduct;
    categories.forEach(category => {
        const categoryProducts = category.products;
        foundProduct = categoryProducts.find(product => product.id === productIdToFind);
        if (typeof foundProduct !== 'undefined') {
            return [category, foundProduct];
        }
    });
    return [null, null];
};

export default findProductInCategories;

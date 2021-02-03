import formatPrice from './formatPrice';
import makeOrder from './makeOrder';
import { calculateAmount, calculateOriginalAmount } from './calculateAmount';
import convertPhone84To0 from './convertPhone84To0';
import generateToken from './generateToken';
import getParamFromURL from './getParamFromURL';
import normalizeForURLs from './normalizeForURLs';
import findByNormalizedName from './findByNormalizedName';
import findProductInCategories from './findProductInCategories';
import getDateTimeFromMilliseconds from './getDateTimeFromMilliseconds';
import getOrderStatusArray from './getOrderStatusArray';
import getOrderQuantity from './getOrderQuantity';
import getBriefDescription from './getBriefDescription';
import { addToCart, removeFromCart, clearCart } from './updateCart';

export {
    formatPrice,
    makeOrder,
    calculateAmount,
    calculateOriginalAmount,
    convertPhone84To0,
    generateToken,
    getParamFromURL,
    normalizeForURLs,
    findByNormalizedName,
    findProductInCategories,
    getDateTimeFromMilliseconds,
    getOrderStatusArray,
    getOrderQuantity,
    getBriefDescription,
    addToCart,
    removeFromCart,
    clearCart
};

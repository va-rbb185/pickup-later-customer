import React from 'react';
import ProductQuantity from './ProductQuantity';

const productImageURL = 'https://dl.dropboxusercontent.com/s/bagyvq9l6plv91b/sample_product_image.jpg';

const ProductTile = (props) => {
    return (
        <div className="product-tile">
            <div className="product-info">
                <img src={productImageURL} alt="product" />
                <div className="product-name">Bột giặt OMO 800g</div>
                <div className="sale-price">37,000 đ</div>
                <div className="original-price"></div>
            </div>
            <ProductQuantity />
        </div>
    );
};

export default ProductTile;

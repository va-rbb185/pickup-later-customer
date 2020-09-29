import React from 'react';
import ProductQuantity from './ProductQuantity';
import { sampleImageURLs } from '../static/resources';

const ProductTile = (props) => {
    const isVerticalTile = !!props.vertical;
    const className = `product-tile ${isVerticalTile ? 'vertical' : 'horizontal'}`;

    if (isVerticalTile) {
        return (
            <div className={className}>
                <div className="product-info">
                    <img src={sampleImageURLs.PRODUCT} alt="product" />
                    <div className="product-name">Bột giặt OMO 800g</div>
                    <div className="sale-price">37,000 đ</div>
                    <div className="original-price"><s>40,000 đ</s></div>
                </div>
                <ProductQuantity />
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="inner-tile">
                <div className="product-image">
                    <img src={sampleImageURLs.PRODUCT} alt="product" />
                </div>
                <div className="product-info">
                    <div className="product-name">Bột giặt OMO 800g</div>
                    <ProductQuantity />
                </div>
                <div className="product-prices">
                    <div className="sale-price">37,000 đ</div>
                    <div className="original-price"><s>40,000 đ</s></div>
                </div>
            </div>
        </div>
    );
};

export default ProductTile;

import React from 'react';
import { Link } from 'react-router-dom';
import { sampleImageURLs } from '../static/resources';
import { formatPrice } from '../helpers';
import ProductQuantity from './ProductQuantity';

const ProductTile = (props) => {
    const isVerticalTile = !!props.vertical;
    const className = `product-tile ${isVerticalTile ? 'vertical' : 'horizontal'}`;
    const { name, imageUrl, price, salePrice } = props.product;

    if (isVerticalTile) {
        return (
            <div className={className}>
                <div className="inner-tile">
                    <div className="product-image">
                        <Link to="/product-details">
                            <img src={imageUrl || sampleImageURLs.PRODUCT} alt="product" />
                        </Link>
                    </div>
                    <div className="product-name">{name}</div>
                    <div className="product-prices">
                        <div className="sale-price">{formatPrice(salePrice)}</div>
                        {
                            salePrice !== price
                                ? <div className="original-price"><s>{formatPrice(price)}</s></div>
                                : null
                        }
                    </div>
                    <div className="product-quantity-wrapper">
                        <ProductQuantity product={props.product} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="inner-tile">
                <div className="product-image">
                    <Link to="/product-details">
                        <img src={imageUrl || sampleImageURLs.PRODUCT} alt="product" />
                    </Link>
                </div>
                <div className="product-info">
                    <div className="product-name-wrapper">
                        <Link to="/product-details" className="product-name">{name}</Link>
                    </div>
                    <div className="product-quantity-wrapper">
                        <ProductQuantity product={props.product} />
                    </div>
                </div>
                <div className="product-prices">
                    <div className="sale-price">{formatPrice(salePrice)}</div>
                    {
                        salePrice !== price
                            ? <div className="original-price"><s>{formatPrice(price)}</s></div>
                            : null
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductTile;

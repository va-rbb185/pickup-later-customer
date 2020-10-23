import React from 'react';
import ProductQuantity from './ProductQuantity';
import { sampleImageURLs } from '../static/resources';
import { Link } from 'react-router-dom';

const ProductTile = (props) => {
    const isVerticalTile = !!props.vertical;
    const className = `product-tile ${isVerticalTile ? 'vertical' : 'horizontal'}`;
    const { name, imageUrl, price, salePrice } = props.product;

    if (isVerticalTile) {
        return (
            <div className={className}>
                <div className="product-info">
                    <Link to="/product-details">
                        <img src={imageUrl || sampleImageURLs.PRODUCT} alt="product" />
                        <div className="product-name">{name}</div>
                    </Link>
                    <div className="sale-price">{salePrice} đ</div>
                    {salePrice !== price ? <div className="original-price"><s>{price} đ</s></div> : null}
                </div>
                <ProductQuantity product={props.product} />
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
                    <Link to="/product-details">
                        <div className="product-name">{name}</div>
                    </Link>
                    <ProductQuantity product={props.product} />
                </div>
                <div className="product-prices">
                    <div className="sale-price">{price} đ</div>
                    {salePrice !== price ? <div className="original-price"><s>{price} đ</s></div> : null}
                </div>
            </div>
        </div>
    );
};

export default ProductTile;

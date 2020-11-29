import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sampleImageURLs } from '../static/resources';
import { formatPrice, normalizeForURLs, findProductInCategories } from '../helpers';
import ProductQuantity from './ProductQuantity';

const ProductTile = ({ vertical = null, category = null, product, allCategories }) => {
    const isVerticalTile = !!vertical;
    const className = `product-tile ${isVerticalTile ? 'vertical' : 'horizontal'}`;
    const { name, imageUrl, price, salePrice } = product;

    let pathToProduct = '/products/null';
    if (category) {
        pathToProduct = `/products/${normalizeForURLs(category.name)}/${normalizeForURLs(name)}`;
    } else {
        const [foundCategory, foundProduct] = findProductInCategories(product.id, allCategories);
        if (foundCategory && foundProduct) {
            pathToProduct = `/products/${normalizeForURLs(foundCategory.name)}/${normalizeForURLs(foundProduct.name)}`;
        }
    }

    if (isVerticalTile) {
        return (
            <div className={className}>
                <div className="inner-tile">
                    <div className="product-image">
                        <Link to={pathToProduct}>
                            <img src={imageUrl || sampleImageURLs.PRODUCT} alt="product" />
                        </Link>
                    </div>
                    <div className="product-name">
                        <Link to={pathToProduct}>{name}</Link>
                    </div>
                    <div className="product-prices">
                        <div className="sale-price">{formatPrice(salePrice)}</div>
                        {
                            salePrice !== price
                                ? <div className="original-price"><s>{formatPrice(price)}</s></div>
                                : null
                        }
                    </div>
                    <div className="product-quantity-wrapper">
                        <ProductQuantity product={product} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="inner-tile">
                <div className="product-image">
                    <Link to={pathToProduct}>
                        <img src={imageUrl || sampleImageURLs.PRODUCT} alt="product" />
                    </Link>
                </div>
                <div className="product-info">
                    <div className="product-name">
                        <Link to={pathToProduct}>{name}</Link>
                    </div>
                    <div className="product-quantity-wrapper">
                        <ProductQuantity product={product} />
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

const mapStateToProps = ({ storeMenu }) => ({ allCategories: storeMenu.groups });
const ConnectedProductTile = connect(mapStateToProps)(ProductTile);

export default ConnectedProductTile;

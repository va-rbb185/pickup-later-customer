import React from 'react';
import { connect } from 'react-redux';
import { findByNormalizedName, formatPrice } from '../helpers';
import { sampleImageURLs } from '../static/resources';
import PageHeader from './PageHeader';
import ProductQuantity from './ProductQuantity';

const ProductDetailPage = ({ match, allCategories }) => {
    const { categoryName, productName } = match.params;
    const category = findByNormalizedName(categoryName, allCategories);
    const product = findByNormalizedName(productName, category.products);
    const { name, imageUrl, salePrice, price, freshFood } = product;

    return (
        <div className="product-details inner-page">
            <PageHeader>Chi tiết Sản phẩm</PageHeader>
            <div className="top-section">
                <div className="product-image">
                    <img src={imageUrl || sampleImageURLs.PRODUCT_DETAIL} alt="" />
                </div>
            </div>
            <div className="details">
                <div className="product-name">{name}</div>
                <div className="sale-price">{formatPrice(salePrice)}</div>
                {
                    salePrice !== price
                        ? <div className="original-price"><s>{formatPrice(price)}</s></div>
                        : null
                }
                <div className="prep-time">{freshFood ? 'Thời gian chuẩn bị 5 - 15 phút' : ''}</div>
                <ProductQuantity product={product} />
            </div>
        </div >
    );
};

const mapStateToProps = ({ storeMenu }) => ({ allCategories: storeMenu.groups });
const ConnectedPDP = connect(mapStateToProps)(ProductDetailPage);

export default ConnectedPDP;

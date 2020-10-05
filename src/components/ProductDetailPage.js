import React from 'react';
import PageHeader from './PageHeader';
import { sampleImageURLs } from '../static/resources';
import ProductQuantity from './ProductQuantity';
import Recommendation from './Recommendation';

const ProductDetailPage = () => {
    return (
        <div className="product-details inner-page">
            <PageHeader pageTitle="Chi tiết Sản phẩm" />
            <div className="top-section">
                <div className="product-image">
                    <img src={sampleImageURLs.PRODUCT_DETAIL} alt="" />
                </div>
            </div>
            <div className="details">
                <div className="product-name">Mì trộn Trứng Xúc xích</div>
                <div className="sale-price">19,000 đ</div>
                <div className="original-price d-none"><s></s></div>
                <div className="prep-time">Thời gian chuẩn bị ~15 phút</div>
                <ProductQuantity />
            </div>
            <Recommendation />
        </div >
    );
};

export default ProductDetailPage;
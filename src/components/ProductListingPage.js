import React from 'react';
import SearchBox from './SearchBox';
import PromoBanner from './PromoBanner';
import PageHeader from './PageHeader';
import ProductTile from './ProductTile';

const ProductListingPage = () => {
    return (
        <div className="product-list inner-page">
            <PageHeader pageTitle="Đồ dùng Gia đình" />
            <div className="top-section">
                <PromoBanner />
                <div className="component-container">
                    <SearchBox />
                </div>
            </div>
            <div className="products">
                {[0, 1, 2, 3, 4].map(index => <ProductTile key={index} />)}
            </div>
        </div>
    );
};

export default ProductListingPage;

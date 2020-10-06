import React from 'react';
import ProductTile from './ProductTile';
import ProductCarousel from './ProductCarousel';

const Recommendation = () => {
    return (
        <div className="product-recommendation">
            <h6>Có thể bạn quan tâm</h6>
            <ProductCarousel>
                {[0, 1, 2, 3, 4].map(index => <ProductTile key={index} vertical />)}
            </ProductCarousel>
        </div>
    );
};

export default Recommendation;

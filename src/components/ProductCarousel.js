import React from 'react';
import Carousel from 'react-elastic-carousel';

const ProductCarousel = (props) => {
    return (
        <Carousel
            className="product-carousel"
            itemsToShow={3}
            showArrows={false}
            pagination={false}
            itemPadding={[8, 4, 8, 4]}
        >
            {props.children}
        </Carousel>
    );
};

export default ProductCarousel;

import React from 'react';

const ProductTile = (props) => {
    return (
        <div className="product-tile">
            <span>Product tile (vertical: {props.vertical ? 'true' : 'false'})</span>
        </div>
    );
};

export default ProductTile;

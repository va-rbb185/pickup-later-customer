import React from 'react';

const productImageURL = 'https://dl.dropboxusercontent.com/s/bagyvq9l6plv91b/sample_product_image.jpg';

const ProductTile = (props) => {
    return (
        <div className="product-tile">
            <div className="product-info">
                <img src={productImageURL} alt="product" />
                <div className="product-name">Bột giặt OMO 800g</div>
                <div className="sale-price">37,000 đ</div>
                <div className="original-price"></div>
            </div>
            <div className="product-quantity">
                <button disabled="" type="button" className="ant-btn btn-quantity ant-btn-icon-only">
                    <span role="img" aria-label="minus" className="anticon anticon-minus">
                        <svg viewBox="64 64 896 896" foscusable="false" className="" data-icon="minus" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                        </svg>
                    </span>
                </button>
                <div className="quantity">0</div>
                <button type="button" className="ant-btn btn-quantity ant-btn-icon-only">
                    <span role="img" aria-label="plus" className="anticon anticon-plus">
                        <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <defs>
                                <style></style>
                            </defs>
                            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                            <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ProductTile;

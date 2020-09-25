import React from 'react';

const bannerURL = 'https://image.shutterstock.com/z/stock-vector-flash-sale-discount-banner-template-promotion-1497823586.jpg';

const PromoBanner = () => {
    return (
        <div className="promo-banner">
            <div className="container-fluid">
                <img src={bannerURL} alt="Promo Banner" title="Promo Banner"/>
            </div>
        </div>
    );
};

export default PromoBanner;

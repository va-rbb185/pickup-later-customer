import React from 'react';

const bannerURL = 'https://dl.dropboxusercontent.com/s/lacnv4jz9tosh3t/giveaway_banner.jpg';

const PromoBanner = () => {
    return (
        <div className="promo-banner">
            <img src={bannerURL} alt="Promo Banner" title="Promo Banner" />
        </div>
    );
};

export default PromoBanner;

import React from 'react';
import { sampleImageURLs } from '../static/resources';

const PromoBanner = () => {
    return (
        <div className="promo-banner">
            <img src={sampleImageURLs.BANNER} alt="Promo Banner" title="Promo Banner" />
        </div>
    );
};

export default PromoBanner;

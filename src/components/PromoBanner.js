import React from 'react';
import { sampleImageURLs } from '../static/resources';
import Carousel from 'react-elastic-carousel';

class PromoBanner extends React.Component {
    componentWillUnmount() {
        console.log('PromoBanner component is about to get unmounted...');
    }

    render() {
        return (
            <div className="promo-banner">
                <Carousel
                    itemsToShow={1}
                    showArrows={false}
                    pagination={false}
                    enableAutoPlay={true}
                    autoPlaySpeed={5000}
                >
                    <div className="promo-image">
                        <img src={sampleImageURLs.BANNER} alt="Promo Banner" title="Promo Banner" />
                    </div>
                    <div className="promo-image">
                        <img src={sampleImageURLs.BANNER} alt="Promo Banner" title="Promo Banner" />
                    </div>
                </Carousel>
            </div>
        );
    }
};

export default PromoBanner;

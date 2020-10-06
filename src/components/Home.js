import React from 'react';
import HomeHeader from './HomeHeader';
import CategoryList from './CategoryList';
import PromoBanner from './PromoBanner';
import HomeCategory from './HomeCategory';
import ProductTile from './ProductTile';

const renderingCallback = index => <ProductTile key={index} vertical />;

const Home = () => {
    return (
        <div className="home inner-page">
            <HomeHeader />
            <PromoBanner />
            <CategoryList cols={4} isShowTop={false} />
            <HomeCategory>
                {[0, 1, 2, 3, 4, 5, 6].map(renderingCallback)}
            </HomeCategory>
            <HomeCategory>
                {[0, 1, 2, 3, 4].map(renderingCallback)}
            </HomeCategory>
            <HomeCategory>
                {[0, 1, 2, 3].map(renderingCallback)}
            </HomeCategory>
        </div>
    );
};

export default Home;

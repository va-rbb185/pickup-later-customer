import React from 'react';
import HomeHeader from './HomeHeader';
import CategoryList from './CategoryList';
import PromoBanner from './PromoBanner';
import HomeCategory from './HomeCategory';
import ProductTile from './ProductTile';

const Home = () => {
    return (
        <div className="home inner-page">
            <HomeHeader />
            <PromoBanner />
            <CategoryList categories={[]} isShowTop />
            <HomeCategory>
                <ProductTile vertical />
                <ProductTile vertical />
                <ProductTile vertical />
            </HomeCategory>
            <HomeCategory>
                <ProductTile vertical />
                <ProductTile vertical />
                <ProductTile vertical />
            </HomeCategory>
            <HomeCategory>
                <ProductTile vertical />
                <ProductTile vertical />
                <ProductTile vertical />
            </HomeCategory>
        </div>
    );
};

export default Home;

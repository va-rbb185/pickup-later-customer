import React from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import CategoryList from './CategoryList';
import PromoBanner from './PromoBanner';
import HomeCategory from './HomeCategory';

const Home = ({ allCategories }) => {
    const top3Categories = allCategories.slice(0, 3);
    return (
        <div className="home inner-page">
            <HomeHeader />
            <PromoBanner />
            <CategoryList
                cols={4}
                isShowTop={false}
                categories={allCategories}
            />
            {top3Categories.map(homeCategory => <HomeCategory key={`homeCat_${homeCategory.id}`} category={homeCategory} />)}
        </div>
    );
};

const mapStateToProps = ({ storeMenu }) => ({ allCategories: storeMenu.groups });
const ConnectedHome = connect(mapStateToProps)(Home);

export default ConnectedHome;

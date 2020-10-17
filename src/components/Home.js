import React from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import CategoryList from './CategoryList';
import PromoBanner from './PromoBanner';
import HomeCategory from './HomeCategory';
import ProductTile from './ProductTile';
import { fetchMenu } from '../actions';

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchMenu();
    }

    render() {
        console.log('Home component rendered/re-rendered:', this.props.storeMenu);

        const renderingCallback = index => <ProductTile key={index} vertical />;
        return (
            <div className="home inner-page">
                <HomeHeader />
                <PromoBanner />
                <CategoryList cols={4} isShowTop={false} categories={[]} />
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
    }
};

const mapStateToProps = state => ({ storeMenu: state.storeMenu });
const ConnectedHome = connect(
    mapStateToProps,
    { fetchMenu }
)(Home);

export default ConnectedHome;

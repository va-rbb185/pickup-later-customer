import React from 'react';
import { connect } from 'react-redux';
import { findByNormalizedName } from '../helpers';
import SearchBox from './SearchBox';
import PageHeader from './PageHeader';
import ProductTile from './ProductTile';

const ProductListingPage = ({ match, allCategories }) => {
    const categoryName = match.params.name;
    const category = findByNormalizedName(categoryName, allCategories);

    return (
        <div className="product-list inner-page">
            <PageHeader>{category.title}</PageHeader>
            <div className="top-section">
                <div className="component-container">
                    <SearchBox />
                </div>
            </div>
            <div className="products">
                {category.products.map(
                    product => (
                        <ProductTile
                            key={`product_${product.id}`}
                            category={category}
                            product={product}
                        />
                    )
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ storeMenu }) => ({ allCategories: storeMenu.groups });
const ConnectedPLP = connect(mapStateToProps)(ProductListingPage);

export default ConnectedPLP;

import React from 'react';
import { Link } from 'react-router-dom';
import ProductCarousel from './ProductCarousel';
import ProductTile from './ProductTile';

const HomeCategory = (props) => {
    const products = props.category ? props.category.products : [];
    return (
        <div className="home-category">
            <div className="container-fluid">
                <div className="home-category-header">
                    <div className="category-name">
                        <h5>{props.category.name}</h5>
                    </div>
                    <div className="show-all-link">
                        <Link to="/product-list">Xem tất cả</Link>
                    </div>
                </div>
                <div className="home-category-body">
                    <ProductCarousel>
                        {products.map(product => <ProductTile vertical key={`product_${product.id}`} product={product} />)}
                    </ProductCarousel>
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;

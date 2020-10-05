import React from 'react';
import { Link } from 'react-router-dom';
import ProductCarousel from './ProductCarousel';

const HomeCategory = (props) => {
    return (
        <div className="home-category">
            <div className="container-fluid">
                <div className="home-category-header">
                    <div className="category-name">
                        <h5>Đồ dùng Gia đình</h5>
                    </div>
                    <div className="show-all-link">
                        <Link to="/product-list">Xem tất cả</Link>
                    </div>
                </div>
                <div className="home-category-body">
                    <ProductCarousel>
                        {props.children}
                    </ProductCarousel>
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;

import React from 'react';
import { Link } from 'react-router-dom';
import { normalizeForURLs } from '../helpers';
import ProductCarousel from './ProductCarousel';
import ProductTile from './ProductTile';

const HomeCategory = ({ category }) => {
    const pathToCategory = `/categories/${normalizeForURLs(category.name)}`;
    return (
        <div className="home-category">
            <div className="container-fluid">
                <div className="home-category-header">
                    <div className="category-name">
                        <h5>{category.name}</h5>
                    </div>
                    <div className="show-all-link">
                        <Link to={pathToCategory}>Xem tất cả</Link>
                    </div>
                </div>
                <div className="home-category-body">
                    <ProductCarousel>
                        {category.products.map(
                            product => (
                                <ProductTile
                                    vertical
                                    key={`product_${product.id}`}
                                    category={category}
                                    product={product}
                                />
                            )
                        )}
                    </ProductCarousel>
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;

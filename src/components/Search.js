import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { normalizeForURLs } from '../helpers';
import SearchBox from './SearchBox';
import PageHeader from './PageHeader';
import ProductTile from './ProductTile';

const Search = () => {
    const [productCategory, setProductCategory] = useState([]);

    useEffect(() => {
        document.body.classList.add('white-smoke-bg');
        return () => {
            document.body.classList.remove('white-smoke-bg');
        };
    }, []);

    return (
        <div className="search inner-page">
            <PageHeader>Tìm kiếm</PageHeader>
            <div className="top-section">
                <div className="component-container">
                    <SearchBox onReceiveSearchResult={result => setProductCategory(result)} />
                </div>
            </div>
            <div className="search-result product-categories">
                {productCategory
                    .filter(({ products }) => products.length > 0)
                    .map(category => {
                        return (
                            <div key={`productCategory_${category.id}`} className="product-category">
                                <div className="product-category-header">
                                    <div className="category-name">
                                        <h5>{category.name}</h5>
                                    </div>
                                    <div className="show-all-link">
                                        <Link to={`/categories/${normalizeForURLs(category.name)}`}>
                                            Xem tất cả
                                                </Link>
                                    </div>
                                </div>
                                <div className="product-category-body">
                                    <div className="products">
                                        {category.products.map(product => (
                                            <ProductTile
                                                key={`product_${product.id}`}
                                                category={category}
                                                product={product}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Search;

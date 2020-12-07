import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { productSearch } from '../api';
import { normalizeForURLs } from '../helpers';
import SearchBox from './SearchBox';
import PageHeader from './PageHeader';
import ProductTile from './ProductTile';

const Search = () => {
    const searchQuery = new URLSearchParams(window.location.search).get('q');
    const [productCategory, setProductCategory] = useState([]);
    let history = useHistory();

    useEffect(() => {
        document.body.classList.add('white-smoke-bg');
        return () => {
            document.body.classList.remove('white-smoke-bg');
        };
    }, []);

    useEffect(() => {
        if (searchQuery && typeof searchQuery === 'string') {
            productSearch(searchQuery)
                .then(response => setProductCategory(response.data))
                .catch(error => console.error(error));
        }
    }, [searchQuery]);

    return (
        <div className="search inner-page">
            <PageHeader>Tìm kiếm</PageHeader>
            <div className="top-section">
                <div className="component-container">
                    <SearchBox
                        onSearchQueryChange={searchQuery => {
                            history.replace({
                                pathname: '/search',
                                search: `?q=${searchQuery}`
                            });
                        }}
                    />
                </div>
            </div>
            <div className="search-result product-categories">
                {productCategory.length > 0
                    ? productCategory
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
                    : null
                }
            </div>
        </div>
    );
};

export default Search;

import React from 'react';
import { Link } from 'react-router-dom';
import { sampleImageURLs } from '../static/resources';

const CategoryTile = (props) => {
    if (props.isShowAllTile) {
        return (
            <div className="category-tile show-all">
                <div className="category-icon">
                    <Link to="/all-categories" >
                        <img src={sampleImageURLs.SHOW_ALL_CATEGORIES} alt="Category Icon" />
                    </Link>
                </div>
                <div className="category-name">
                    <Link to="/all-categories">Tất cả</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="category-tile">
            <div className="category-icon">
                <Link to="/product-list" >
                    <img src={props.category.imageUrl || sampleImageURLs.CATEGORY} alt="Category Icon" />
                </Link>
            </div>
            <Link to="/product-list" >
                <div className="category-name">{props.category.name}</div>
            </Link>
        </div>
    );
};

export default CategoryTile;

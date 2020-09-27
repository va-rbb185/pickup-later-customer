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
                <img src={sampleImageURLs.CATEGORY} alt="Category Icon" />
            </div>
            <div className="category-name">Giải khát - Bia</div>
        </div>
    );
};

export default CategoryTile;

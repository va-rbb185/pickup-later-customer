import React from 'react';
import { Link } from 'react-router-dom';
import { normalizeForURLs } from '../helpers';
import { sampleImageURLs } from '../static/resources';

const CategoryTile = ({ category }) => {
    const { name, imageUrl } = category;
    const pathToCategory = `/categories/${normalizeForURLs(name)}`;
    return (
        <div className="category-tile">
            <div className="category-icon">
                <Link to={pathToCategory}>
                    <img src={imageUrl || sampleImageURLs.CATEGORY} alt="Category Icon" />
                </Link>
            </div>
            <div className="category-name">
                <Link to={pathToCategory}>{name}</Link>
            </div>
        </div>
    );
};

export default CategoryTile;

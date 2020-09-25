import React from 'react';
import CategoryTile from './CategoryTile';

const CategoryList = (props) => {
    return (
        <div className="category-list">
            <div className="container-fluid">
                <div className="list-wrapper">
                    <CategoryTile />
                    <CategoryTile />
                    <CategoryTile />
                    <CategoryTile />
                    <CategoryTile />
                    <CategoryTile />
                    <CategoryTile />
                </div>
            </div>
        </div>
    );
};

export default CategoryList;

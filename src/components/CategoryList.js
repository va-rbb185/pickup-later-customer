import React from 'react';
import CategoryTile from './CategoryTile';

const CategoryList = (props) => {
    const isShowTop = !!props.isShowTop;

    if (isShowTop) {
        return (
            <div className="category-list show-top">
                <div className="container-fluid">
                    <div className="list-wrapper">
                        <CategoryTile />
                        <CategoryTile />
                        <CategoryTile />
                        <CategoryTile />
                        <CategoryTile isShowAllTile />
                    </div>
                </div>
            </div>
        );
    }

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
                    <CategoryTile />
                </div>
            </div>
        </div>
    );
};

export default CategoryList;

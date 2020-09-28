import React from 'react';
import CategoryTile from './CategoryTile';

const CategoryList = (props) => {
    const colClassName = !!props.cols && props.cols >= 2 && props.cols <= 4
        ? ` has-${props.cols}-cols`
        : '';
    const componentClassName = 'category-list' + colClassName;

    if (props.isShowTop) {
        return (
            <div className={componentClassName}>
                <div className="container-fluid">
                    <div className="list-wrapper">
                        <CategoryTile />
                        <CategoryTile />
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
        <div className={componentClassName}>
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

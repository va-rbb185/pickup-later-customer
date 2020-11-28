import React from 'react';
import CategoryTile from './CategoryTile';

const CategoryList = ({ cols, categories }) => {
    const colClassName = !!cols && cols >= 2 && cols <= 4 ? ` has-${cols}-cols` : '';
    const componentClassName = 'category-list' + colClassName;
    return (
        <div className={componentClassName}>
            <div className="container-fluid">
                <div className="list-wrapper">
                    {categories.map(
                        category => <CategoryTile key={`category_${category.id}`} category={category} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;

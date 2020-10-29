import React from 'react';
import CategoryList from './CategoryList';
import PageHeader from './PageHeader';

const CategoryListingPage = () => {
    return (
        <div className="all-categories inner-page">
            <PageHeader>Tất cả Danh mục</PageHeader>
            <CategoryList cols={3} isShowTop={false} />
        </div>
    );
};

export default CategoryListingPage;

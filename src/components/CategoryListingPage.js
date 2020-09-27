import React from 'react';
import CategoryList from './CategoryList';
import PageHeader from './PageHeader';

const CategoryListingPage = () => {
    return (
        <div className="all-categories inner-page">
            <PageHeader pageTitle="Tất cả Danh mục" />
            <CategoryList categories={[]} />
        </div>
    );
};

export default CategoryListingPage;

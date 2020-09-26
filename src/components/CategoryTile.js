import React from 'react';

const categoryImageURL = 'https://dl.dropboxusercontent.com/s/fjtgt9hwiqblr0e/category_icon_beverage_beer.jpg';

const CategoryTile = () => {
    return (
        <div className="category-tile">
            <div className="category-icon">
                <img
                    src={categoryImageURL}
                    alt="Category Icon"
                />
            </div>
            <div className="category-name">Giải khát - Bia</div>
        </div>
    );
};

export default CategoryTile;

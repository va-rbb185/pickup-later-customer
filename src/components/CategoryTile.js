import React from 'react';
import { Link } from 'react-router-dom';

const catImageURL = 'https://dl.dropboxusercontent.com/s/fjtgt9hwiqblr0e/category_icon_beverage_beer.jpg';
const showAllImageURL = 'https://dl.dropboxusercontent.com/s/hm6f8nk3j6ijhat/show_all_categories_icon.jpg';

const CategoryTile = (props) => {
    if (props.isShowAllTile) {
        return (
            <div className="category-tile show-all">
                <div className="category-icon">
                    <Link to="/all-categories" >
                        <img src={showAllImageURL} alt="Category Icon" />
                    </Link>
                </div>
                <div className="category-name">
                    <Link to="/all-categories" >Tất cả</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="category-tile">
            <div className="category-icon">
                <img src={catImageURL} alt="Category Icon" />
            </div>
            <div className="category-name">Giải khát - Bia</div>
        </div>
    );
};

export default CategoryTile;

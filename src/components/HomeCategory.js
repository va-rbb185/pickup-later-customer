import React from 'react';

const HomeCategory = (props) => {
    return (
        <div className="home-category">
            <div className="container-fluid">
                <div className="home-category-header">
                    <div className="category-name">
                        <h5>Đồ dùng Gia đình</h5>
                    </div>
                    <div className="show-all-link">
                        <a href="#">Xem tất cả</a>
                    </div>
                </div>
                <div className="home-category-body">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default HomeCategory;

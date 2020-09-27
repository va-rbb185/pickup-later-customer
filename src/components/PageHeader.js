import React from 'react';
import { Link } from 'react-router-dom';

let homeLogo = 'https://dl.dropboxusercontent.com/s/eyrwkcu6f2pk30w/app_logo_128.png';

const PageHeader = (props) => {
    return (
        <div className="page-header">
            <div className="page-header-wrapper">
                <Link to="/">
                    <div className="home-logo">
                        <img src={homeLogo} alt="Home Logo" />
                    </div>
                </Link>
                <h4>{props.pageTitle}</h4>
            </div>
        </div>
    );
};

export default PageHeader;

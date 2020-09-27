import React from 'react';
import { Link } from 'react-router-dom';
import { sampleImageURLs } from '../static/resources';

const PageHeader = (props) => {
    return (
        <div className="page-header">
            <div className="page-header-wrapper">
                <Link to="/">
                    <div className="home-logo">
                        <img src={sampleImageURLs.LOGO} alt="Home Logo" />
                    </div>
                </Link>
                <h4>{props.pageTitle}</h4>
            </div>
        </div>
    );
};

export default PageHeader;

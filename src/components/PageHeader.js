import React from 'react';
import { Link } from 'react-router-dom';
import { sampleImageURLs } from '../static/resources';

const PageHeader = ({ noLogo, children }) => {
    return (
        <div className="page-header">
            <div className="page-header-wrapper">
                {
                    !noLogo
                        ? <div className="home-logo">
                            <Link to="/">
                                <img src={sampleImageURLs.LOGO} alt="Home Logo" />
                            </Link>
                        </div>
                        : null
                }
                <h4>{children}</h4>
            </div>
        </div>
    );
};

export default PageHeader;

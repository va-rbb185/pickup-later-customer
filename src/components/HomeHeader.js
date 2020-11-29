import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import SearchBox from './SearchBox';

const HomeHeader = ({ isLoggedIn, showSideBar }) => {
    return (
        <div className="home-header">
            <div className="container-fluid">
                <div className="home-header-wrapper">
                    <SearchBox />
                    {isLoggedIn
                        ? <Button className="account-btn" icon="user" onClick={showSideBar} />
                        : <Button as={Link} to="/login" className="account-btn" icon="user" />
                    }
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;

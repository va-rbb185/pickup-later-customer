import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import SearchBox from './SearchBox';

const HomeHeader = ({ isLoggedIn, showSideBar }) => {
    let history = useHistory();
    return (
        <div className="home-header">
            <div className="container-fluid">
                <div className="home-header-wrapper">
                    <SearchBox />
                    <Button
                        icon="user"
                        onClick={() => {
                            if (isLoggedIn) {
                                showSideBar();
                            } else {
                                history.push('/login');
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;

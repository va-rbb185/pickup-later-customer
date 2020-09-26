import React from 'react';
import { Button } from 'semantic-ui-react';
import SearchBox from './SearchBox';

const HomeHeader = (props) => {
    return (
        <div className="home-header">
            <div className="container-fluid">
                <div className="home-header-wrapper">
                    <SearchBox />
                    <Button icon='user' />
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;

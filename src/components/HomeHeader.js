import React from 'react';
import { Button } from 'semantic-ui-react';
import AddressBar from './AddressBar';
import SearchBox from './SearchBox';

const HomeHeader = (props) => {
    return (
        <div className="home-header">
            <div className="container-fluid">
                <div className="home-header-topbar">
                    <AddressBar />
                    <Button icon='user' />
                </div>
                <SearchBox />
            </div>
        </div>
    );
};

export default HomeHeader;

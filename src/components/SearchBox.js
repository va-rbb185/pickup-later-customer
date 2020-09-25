import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchBox = () => {
    return (
        <div className="search-box">
            <Input fluid icon='search' placeholder='Search...' />
        </div>
    );
};

export default SearchBox;

import React from 'react';
import SearchBox from './SearchBox';
import PageHeader from './PageHeader';

class Search extends React.Component {
    render() {
        return (
            <div className="search inner-page">
                <PageHeader>Tìm kiếm</PageHeader>
                <div className="top-section">
                    <div className="component-container">
                        <SearchBox />
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;

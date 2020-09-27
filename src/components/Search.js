import React from 'react';
import SearchBox from './SearchBox';
import PageHeader from './PageHeader';

class Search extends React.Component {
    render() {
        return (
            <div className="search inner-page">
                <PageHeader pageTitle="Tìm kiếm" />
                <div className="search-box-wrapper">
                    <SearchBox />
                </div>
            </div>
        );
    }
}

export default Search;

import React, { useEffect } from 'react';
import SearchBox from './SearchBox';
import PageHeader from './PageHeader';

const Search = () => {
    useEffect(() => {
        document.body.classList.add('white-smoke-bg');
        return () => {
            document.body.classList.remove('white-smoke-bg');
        };
    }, []);

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
};

export default Search;

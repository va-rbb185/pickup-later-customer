import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.isSearchPage = this.props.location.pathname === '/search';
        this.inputTimer = null;
        this.onSearchBoxClick = this.onSearchBoxClick.bind(this);
        this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
    }

    onSearchBoxClick() {
        if (!this.isSearchPage) {
            this.props.history.push('/search');
        }
    }

    onSearchBoxChange(event) {
        window.clearTimeout(this.inputTimer);
        const searchQuery = event.target.value;
        if (searchQuery && searchQuery.length > 2) {
            this.inputTimer = window.setTimeout(() => this.props.onSearchQueryChange(searchQuery), 2000);
        }
    }

    componentDidMount() {
        if (this.isSearchPage) {
            this.searchInput.focus();
        }
    }

    render() {
        return (
            <div className="search-box">
                <div className="ui fluid icon input">
                    <input
                        ref={input => { this.searchInput = input; }}
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        onClick={this.onSearchBoxClick}
                        onChange={this.onSearchBoxChange}
                    />
                    <i className="search icon"></i>
                </div>
            </div>
        );
    }
}

const SearchBoxWithRouter = withRouter(SearchBox);

export default SearchBoxWithRouter;

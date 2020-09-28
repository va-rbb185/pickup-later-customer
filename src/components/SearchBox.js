import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.isSearchPage = this.props.location.pathname === '/search';
        this.onSearchBoxClick = this.onSearchBoxClick.bind(this);
        this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
    }

    onSearchBoxClick() {
        if (!this.isSearchPage) {
            this.props.history.push('/search');
        }
    }

    onSearchBoxChange() { }

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
                        ref={(input) => { this.searchInput = input; }}
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        onClick={this.onSearchBoxClick}
                    />
                    <i className="search icon"></i>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchBox);

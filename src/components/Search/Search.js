import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

import './search.css';

class Search extends Component {
    state = {
        page: 1,
    }

    submit = () => {
        this.setState(({ page }) => ({ page: page + 1 }));
    }

    render() {
        return (
            <form class="search-form" onSubmit={this.submit}>
                <label>
                    <select>
                        <option value="0-1">Less than 1 mile</option>
                        <option value="0-2">Less than 2 miles</option>
                        <option value="0-3">Less than 3 mile</option>
                    </select>
                </label>
            </form>
        );
    }
}

export default Search;

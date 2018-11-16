import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import FullscreenMap from './components/FullscreenMap/FullscreenMap';
import Search from "./components/Search/Search";

import List from './components/List/List';

class App extends Component {
  state = {
    active: null
  };

  selectRoute = () => {

  };

  render() {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Router>
          <div style={{ height: '100%', width: '100%'}}>
            <Route path="/" component={List} />
            <Route path="/map">
              {() => (
                <FullscreenMap route={this.state.active} />
              )}
            </Route>
            <Route path="/search">
                <h1>hi</h1>
            </Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import FullscreenMap from './components/FullscreenMap/FullscreenMap';
import Search from "./components/Search/Search";

import List from './components/List/List';

class App extends Component {
  state = {
    active: null
  };

  selectRoute = (walk) => {
    this.setState({active: walk});
  };

  render() {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <Router>
          <Switch style={{ height: '100%', width: '100%'}}>
            <Route path="/">
              <List onSelect={this.selectRoute} />
            </Route>
            <Route path="/map">
              {() => (
                <FullscreenMap route={this.state.active && this.state.active.path} />
              )}
            </Route>
            <Route path="/search">
                <h1>hi</h1>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

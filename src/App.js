import React, { Component } from 'react';
import { Router, Route, Link, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import FullscreenMap from './components/FullscreenMap/FullscreenMap';
import Search from "./components/Search/Search";
import { createBrowserHistory } from 'history';
import List from './components/List/List';

const existing = localStorage.getItem('active-walk');

const { PUBLIC_URL } = process.env;
const history = createBrowserHistory({
  basename: PUBLIC_URL || '',
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ec6711',
    },
    secondary: {
      main: '#b39a19'
    },
  },
});

export const pp = (p) => `${PUBLIC_URL || ''}${p}`;

class App extends Component {
  state = {
    active: existing && JSON.parse(existing),
  };

  selectRoute = (walk) => {
    this.setState({active: walk});
    localStorage.setItem('active-walk', JSON.stringify(walk));
    history.push(pp('/map'));
  };

  render() {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <Switch style={{ height: '100%', width: '100%'}}>
              <Route path={`/`} exact>
                <List onSelect={this.selectRoute} />
              </Route>
              <Route path={`/map`}>
                {(p) => (
                  <FullscreenMap centerRoute route={this.state.active && this.state.active.path} />
                )}
              </Route>
              <Route path={`/search`}>
                  <h1>hi</h1>
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Router, Route, Link, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import FullscreenMap from './components/FullscreenMap/FullscreenMap';
import Search from "./components/Search/Search";
import { createBrowserHistory } from 'history';
import List from './components/List/List';
import { TextField, FormControl, Button, Checkbox, FormLabel } from '@material-ui/core';
import CookieConsent from "react-cookie-consent";

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

export const pp = (p) => `${''}${p}`;

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
        <CookieConsent style={{zIndex: 1000000000000000}}>
          Our website uses cookies, as almost all websites do, to help provide you with the best experience we can. Cookies are small text files that are placed on your computer or mobile phone when you browse websites.
          Gå uses these cookies to improve its service by using google analytics, please read the <a style={{color: '#f8a103'}} href="https://support.google.com/analytics/answer/6004245?hl=en">Google Analytics Privacy Policy</a>
        </CookieConsent>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <Switch style={{ height: '100%', width: '100%'}}>
              <Route path={`/`} exact>
                <List onSelect={this.selectRoute} />
              </Route>
              <Route path={`/map`}>
                {(p) => (
                  <FullscreenMap centerRoute active={this.state.active} route={this.state.active && this.state.active.path} />
                )}
              </Route>
              <Route path="/contact-us">
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <form
                    method="POST" action="https://formspree.io/takeyourmindforawalk90@gmail.com"
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      minHeight: 500,
                      justifyContent: 'space-between'
                    }}
                  >
                    <h1>Contact us if you're interested!</h1>
                    <div>
                      <TextField placeholder="Name" name="name" required />
                      <br />
                      <TextField placeholder="Email address" name="_replyto" type="email" required />
                    </div>
                    <TextField placeholder="message" multiline name="message" />
                    <input type="hidden" name="_next" value="https://app.takeyourmindforawalk.com" />
                    <FormLabel><Checkbox name="ok_with_contact"/>I am OK with receiving emails from Gå</FormLabel>
                    <Button type="submit">Send</Button>
                  </form>
                </div>
              </Route>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

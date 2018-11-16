import React, { Component } from 'react';
import Map from './components/Map/Map.js';

class App extends Component {
  render() {
    return (
      <div style={{height: 500, width: 500}}>
        <Map />
      </div>
    );
  }
}

export default App;

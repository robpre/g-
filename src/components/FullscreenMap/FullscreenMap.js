import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Map from '../Map/Map';
import { Button } from '@material-ui/core';

import {pp} from '../../App';

const style = {
    zIndex: '1000',
    position: 'fixed',
    bottom: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
};

class FullscreenMap extends Component {
    state = {
        walking: false,
    };

    startWalk = () => {
        this.setState({ walking: true });
    }

    doneWalk = () => {
        this.setState({
            walking: false,
            done: true,
        });
    }

    render() {
        const { props } = this;

        return (
            <div style={{ width: '100%', height: '100%'}}>
                <Map {...props} pulse>
                    <div style={style}>
                        {
                            !this.state.walking && !this.state.done ?
                            <Button onClick={this.startWalk} variant="extendedFab" color="primary">
                                Start walk
                            </Button> : null
                        }
                        {
                            this.state.walking && (
                                <Button onClick={this.doneWalk} variant="extendedFab" color="primary">
                                    Finished!
                                </Button>
                            )
                        }
                        {
                            this.state.done && (
                                <p style={{
                                    fontSize: '2rem',
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    padding: '1rem',
                                    borderRadius: '10%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                    <span role="img" aria-label="celebration emoji">🎉</span> Congratulations!
                                    <br />
                                    You've walked another 3 miles!
                                    <br />
                                    <Link to={pp('/')} style={{textDecoration: 'none'}}>
                                        <Button variant="extendedFab" color="secondary">
                                            Get me another route
                                        </Button>
                                    </Link>
                                </p>
                            )
                        }
                    </div>
                </Map>
            </div>
        )
    }
}

export default FullscreenMap;

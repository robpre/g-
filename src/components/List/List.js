import React, { Component } from 'react';

import Map from '../Map/Map';
import one from '../../route.json';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import search from './search.svg';
import logo from './logo3.svg';
import { Button } from '@material-ui/core';
import Icon from './icons/Icon';

const style = {
    width: '100%',
    display: 'flex',
    'justifyContent': 'space-between',
    'flexDirection': 'row',
};

const Item = ({ title, value }) => (
    <ListItem style={style}>
        <span>{title}: </span>
        <span>{value}</span>
    </ListItem>
);

class ListOfWalks extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        this.setState({
            list: Array.from({ length: 5 }).fill({
                path: one,
                distance: "1",
                is_flat: true,
                is_muddy: false,
                is_ssf: false,
                lighting: "open air",
                shoes: [
                    "Hiking boots",
                    "Wellington boots"
                ],
                time: "12",
                title: "Bacton Woods"
            }),
        });
    }

    render() {
        return (
            <div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <img src={logo} style={{ width: '50vw' }} alt="G" />
                    <sub><i>Take your mind for a walk</i></sub>
                    <Button variant="extendedFab" style={{ marginTop: '1rem' }}>
                        <img width="24" height="24" src={search} style={{ marginRight: '1rem' }} />
                        Search
                    </Button>
                </div>
                <List style={{ width: '100%' }}>
                    {this.state.list.map(walk => (
                        <ListItem>
                            <Card onClick={() => this.props.onSelect(walk)} style={{ width: '100%'}}>
                                <div style={{ height: 200, width: '100%' }} onClick={evt => evt.stopPropagation()}>
                                    <Map zoomControl={false} centerRoute route={walk.path} />
                                </div>
                                <CardContent style={{ paddingTop: 0 }}>
                                    <div>
                                        <List>
                                            <Item title="Distance from you" value={walk.distance}/>
                                            <Item title="Time" value={`${walk.time} minutes`} />
                                            <ListItem>
                                                <Icon meta={walk} key={walk.id} />
                                            </ListItem>
                                        </List>
                                    </div>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}


export default ListOfWalks;

import React, { Component } from 'react';

import Map from '../Map/Map';
import one from '../../route.json';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Logo from './logo3.svg';

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
                name: 'foo',
                distance: 1,
                time: 123,
                route: one,
            }),
        });
    }

    render() {
        return (
            <div>
                <Logo />
                <List style={{ width: '100%' }}>
                    {this.state.list.map(walk => (
                        <ListItem>
                            <Card style={{ width: '100%'}}>
                                <div style={{ height: 200, width: '100%' }}>
                                    <Map zoomControl={false} centerRoute route={walk.route} />
                                </div>
                                <CardContent style={{ paddingTop: 0 }}>
                                    <div>
                                        <List>
                                            <Item title="Distance from you" value={walk.distance}/>
                                            <Item title="Time" value={`${walk.time} minutes`} />
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

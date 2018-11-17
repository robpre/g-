import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { GeoJSON, Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './map.css';
import bbox from '@turf/bbox';
import EventEmitter from 'eventemitter3';
import '@ansur/leaflet-pulse-icon';
import '@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const pulsingIcon = L.icon.pulse({ iconSize:[20,20], color:'#2d89ff' });


if (!("geolocation" in navigator)) {
    alert('No geolocation!');
}

const geoOptions = {
    enableHighAccuracy: true,
    maximumAge        : 500,
    timeout           : 5000
};

let once = false;

const handleError = (e) => {
    if (!once) {
        console.log(e.message);
        once = true;
    }
}
const getMiddle = (geo) => {
    const middleN = geo.features[0].geometry.coordinates.length;
    return geo.features[0].geometry.coordinates[Math.round(middleN/2)]
};
const flip = ([ lng, lat ]) => [lat, lng];
const getFirst = geo => flip(geo.features[0].geometry.coordinates[0]);

const inc = ([o, t]) => {
    return [o + .0001, t + .0001];
};
const dec = ([o, t]) => [o -.0001, t-.0001];

const loc = new EventEmitter();
navigator.geolocation.watchPosition((position) => {
    console.log('got update');
    loc.emit('up', position);
}, handleError, geoOptions);

class GaMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geo: undefined
        };
    }

    componentDidMount() {
        console.log('getting geolocation');
        const self = this;
        this.func = function(position) {
            self.setState({ geo: [position.coords.latitude, position.coords.longitude] });
        };
        loc.addListener('up', this.func);
    }

    componentWillUnmount() {
        loc.removeListener('up', this.func);
    }

    render() {
        const { route, children, centerRoute, pulse, ...props } = this.props;
        console.log('rendering geo', this.state);
        let centering = {
            center: this.state.geo
        };


        if (route && centerRoute) {
            const bboxArray = bbox(route);
            const corner1 = dec([bboxArray[1], bboxArray[0]]);
            const corner2 = inc([bboxArray[3], bboxArray[2]]);
            const bounds = [corner1, corner2];
            centering = { bounds };
        }

        return (
            <div className="map">
                <Map {...centering} zoom={16} {...props}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {this.state.geo && <Marker position={this.state.geo}>
                        <Popup>
                            You are here
                        </Popup>
                    </Marker>}
                    <GeoJSON data={route} />
                    {pulse && route ? <Marker icon={pulsingIcon} position={getFirst(route)} /> : null }
                    {children}
                </Map>
            </div>
        );
    }
}

export default GaMap;

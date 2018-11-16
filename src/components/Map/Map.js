import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { GeoJSON, Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './map.css';
import bbox from '@turf/bbox';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

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
        alert(e.message);
        once = true;
    }
}
const getMiddle = (geo) => {
    const middleN = geo.features[0].geometry.coordinates.length;
    return geo.features[0].geometry.coordinates[Math.round(middleN/2)]
};
const flip = ([ lng, lat ]) => [lat, lng];

class GaMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geo: undefined
        };
    }

    componentDidMount() {
        try {
            console.log('getting geolocation');
            this.id = navigator.geolocation.watchPosition((position) => {
                console.log('got update');
                this.setState({ geo: [position.coords.latitude, position.coords.longitude] });
            }, handleError, geoOptions);
        } catch(e) {
            alert(e.message);
            throw e;
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.id);
    }

    render() {
        const { route, children, centerRoute, ...props } = this.props;
        console.log('rendering geo', this.state);
        let centering = {
            center: this.state.geo
        };

        if (route && centerRoute) {
            const bboxArray = bbox(route);
            const corner1 = [bboxArray[1], bboxArray[0]];
            const corner2 = [bboxArray[3], bboxArray[2]];
            const bounds = [corner1, corner2];
            centering = { bounds };
        }

        return (
            <div className="map">
                <Map {...centering} zoom={16} {...props}>
                    <TileLayer
                        url="http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=37635e2da12d4bcf90bb1137d42cc392"
                        attribution='Maps © <a href="http://www.thunderforest.com/">Thunderforest</a>, Data © OpenStreetMap contributors.'
                    />
                    {this.state.geo && <Marker position={this.state.geo}>
                        <Popup>
                            You are here
                        </Popup>
                    </Marker>}
                    <GeoJSON data={route} />
                    {children}
                </Map>
            </div>
        );
    }
}

export default GaMap;

import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './map.css';

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

class GaMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            geo: undefined
        };
    }

    async componentDidMount() {
        try {
            console.log('getting geolocation');
            navigator.geolocation.watchPosition((position) => {
                console.log('got update');
                this.setState({ geo: [position.coords.latitude, position.coords.longitude] });
            }, alert, geoOptions);
        } catch(e) {
            alert(e.message);
            throw e;
        }
    }

    render() {
        const { children, ...props } = this.props;
        console.log('rendering geo', this.state);
        return (
            <div className="map">
                <Map center={this.state.geo} zoom={16} {...props}>
                    <TileLayer
                        url="http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=37635e2da12d4bcf90bb1137d42cc392"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={this.state.geo}></Marker>
                    {children}
                </Map>
            </div>
        );
    }
}

export default GaMap;

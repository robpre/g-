import React, { Fragment } from 'react';

import { GeoJSON, Marker } from 'react-leaflet';

import Map from '../Map/Map';

const getMiddle = (geo) => {
    const middleN = geo.features[0].geometry.coordinates.length;
    return geo.features[0].geometry.coordinates[Math.round(middleN/2)]
};
const flip = ([ lng, lat ]) => [lat, lng];
const getStyle = () => ({

});

export default (props) => (
    <div style={{ width: '100%', height: '100%'}}>
        <Map {...props}>
        </Map>
    </div>
);

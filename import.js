const fs = require('fs');
const { basename } = require('path');
const haversine = require('haversine');

const files = fs.readdirSync('./fixtures').map(f => `./fixtures/${f}`);
const bool = () => Math.random() < 0.4

const myLoc = { latitude: 52.6296199, longitude: 1.2974222 };

const flip = ([ lng, lat ]) => [lat, lng];
const getFirst = geo => flip(geo.features[0].geometry.coordinates[0]);
const toObj = ([ latitude, longitude ]) => ({latitude, longitude});
const measure = (coords) => {
    let tot = 0;
    coords.reduce((last, lnglat) => {
        tot += haversine(toObj(flip(last)), toObj(flip(lnglat)), {unit: 'mile'})
        return lnglat;
    });

    return tot;
};

const makeThing = (path, fileName) => ({
    path,
    time: 123,
    name: fileName.split('.')[0],
    length: measure(path.features[0].geometry.coordinates),
    distance: haversine(myLoc, toObj(getFirst(path)), {unit: 'mile'}),
    isBuggyFriendly: bool(),
    isShortSightedFriendly: bool(),
    isWellLit: bool(),
    isWelliesNeeded: bool(),
    isWalkingBootsNeeded: bool(),
    isTrainerFriendly: bool(),
    isWheelchairFriendly: bool(),
    isSlipHazard: bool(),
    isFlatSurface: bool(),
    isChildSafe: bool(),
    isRoadSafe: bool(),
    isLearningToRideAbike: bool(),
})

const walks = [];

files.forEach(x => {
    const path = require(x);

    const walk = makeThing(path, basename(x));

    walks.push(walk);
});

walks.sort((a, b) => a.distance - b.distance);

console.log(JSON.stringify(walks, null, '  '));

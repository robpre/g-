'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const haversine = require('haversine');

admin.initializeApp();

const app = express();

/* AUTH CODE
const authenticate = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch(e) {
    res.status(403).send('Unauthorized');
    return;
  }
};

app.use(authenticate);
*/

//UI pages with material ui and react

// Get walking routes ordered by distance
// Validate and store walk submission
app.get('/walk/closest', async (req, res) => {
  try{
      
    const myLat = req.query.latitude;
    const myLong = req.query.longitude;
    
    
    const myLocation = {
      latitude: myLat,
      longitude: myLong
    };
    
    
    const walks = await admin.database().ref(`/walk`).once('value');
    const distanceToEach = [];
    
    walks.forEach((walk) => {
    
        //in reverse order in geoJSON
        const features = walk.child("/path/features").val()[0];
        
        const walkLocation = {
            latitude: features.geometry.coordinates[0][1], 
            longitude: features.geometry.coordinates[0][0]
        };
        
        console.log(walkLocation);
        console.log(myLocation);
        
        //TODO: iterate over points and check for the nearest point rather than the start point
        //User may be able to start the walk somewhere other than the start
        
        //console.log(haversine(start, end));
        //console.log(haversine(start, end, {unit: 'mile'}));
        const distanceToThis = haversine(myLocation, walkLocation);
        
        distanceToEach.push({
            walk: walk.val(),
            distanceTo: distanceToThis
        });
       
    });
    
    distanceToEach.sort(function(a, b) {
        return a.distanceTo - b.distanceTo;
    });
    
    const sortedWalks = [];
    
    distanceToEach.forEach((distanceToWalkIndex) => {
        sortedWalks.push({
            ...distanceToWalkIndex.walk,
            distanceFromMe:distanceToWalkIndex.distanceTo
        });
    });
    
    res.status(200).json(sortedWalks);
    
    
  } catch(error) {
    console.log('Error ordering by closest', error.message);
    res.sendStatus(500);
  }  
  
});

// POST walking route
// Validate and store walk submission
app.post('/walk/add', async (req, res) => {
  
  const walkTitle = req.body.title;
  const walkDistance = req.body.distance;
  const walkTime = req.body.time;
  const walkShoes = req.body.shoes;
  const walkPath = JSON.parse(req.body.path);
  
  const isFlat = (req.body.isFlat == "on");
  const isWellLit = (req.body.isWellLit == "on");
  const isShortSightedFriendly = (req.body.isShortSightedFriendly == "on");
  const isMuddy = (req.body.isMuddy == "on");
  const isBuggyFriendly = (req.body.isBuggyFriendly == "on");
  const isWheelchairFriendly = (req.body.isWheelchairFriendly == "on");
  const isSlipHazard = (req.body.isSlipHazard == "on");
  const isChildSafe = (req.body.isChildSafe == "on");
  const isRoadSafe = (req.body.isRoadSafe == "on");
  const isLearningBicycleFriendly = (req.body.isLearningBicycleFriendly == "on");
  
  try {
        const data = {
            title: walkTitle, 
            distance: walkDistance, 
            time: walkTime, 
            shoes : walkShoes,
            path : walkPath,
            isFlat: isFlat,
            isWellLit: isWellLit,
            isShortSightedFriendly: isShortSightedFriendly,
            isMuddy: isMuddy,
            isBuggyFriendly: isBuggyFriendly,
            isWheelchairFriendly: isWheelchairFriendly,
            isSlipHazard: isSlipHazard,
            isChildSafe: isChildSafe,
            isRoadSafe: isRoadSafe,
            isLearningBicycleFriendly: isLearningBicycleFriendly
         };

        const newWalkKey = await admin.database().ref(`/walk`).push(data).key;
        
        res.status(201).json({
        
            ...data,id:newWalkKey
        
        });
        
        
  } catch(error) {
    console.log('Error adding new walk', error.message);
    res.sendStatus(500);
  }
});

// POST walking route
// Validate and store walk submission
app.post('/walk/:walkId', async (req, res) => {
  const message = req.body.message;
  try {
    const snapshot = await admin.database().ref(`/walk/${walkId}`).once('value');
    if (!snapshot.exists()) {
      return res.status(404).json({errorCode: 404, errorMessage: `walk '${walkId}' not found`});
    }
    res.json(snapshot.val());
    return res.set('Cache-Control', 'private, max-age=300');
  } catch(error) {
    console.log('Error accessing specified walk (does it exist?)', error.message);
    res.sendStatus(500);
  }
});

// GET /walks/all
// Get a list of walks with metadata
app.get('/walk/all', async (req, res) => {
  try {
    const snapshot = await admin.database().ref(`/walk`).once('value');
    if (!snapshot.exists()) {
      return res.status(404).json({errorCode: 404, errorMessage: `walk '${walkId}' not found`});
    }
    res.json(snapshot.val());
    return res.set('Cache-Control', 'private, max-age=300');
  } catch(error) {
    console.log('Error getting walks', error.message);
    return res.sendStatus(500);
  }
});

exports.api = functions.https.onRequest(app);

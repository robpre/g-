'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

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
      
    //order by Latlong distances 
    
    res.status(200).json({nothing: "yet"});
    
  } catch(error) {
    console.log('Error adding new walk', error.message);
    res.sendStatus(500);
  }  
  
});


// POST walking route
// Validate and store walk submission
app.post('/walk/add', async (req, res) => {
  
  const walkTitle = req.body.title;
  const walkDistance = req.body.distance;
  const walkTime = req.body.time;
  const walkIsFlat = (req.body.is_flat == "on");
  const walkLighting = req.body.lighting;
  const walkIsShortSightedFriendly = (req.body.is_ssf == "on");
  //const walkPhoto = req.body.photo;
  const walkIsMuddy = (req.body.is_muddy == "on");
  const walkShoes = req.body.shoes;
  const walkPath = JSON.parse(req.body.path);
  
  try {
        const data = {
            title: walkTitle, 
            distance: walkDistance, 
            time: walkTime, 
            lighting: walkLighting,
            is_flat: walkIsFlat, 
            is_ssf: walkIsShortSightedFriendly,
            is_muddy:  walkIsMuddy,
            shoes : walkShoes
         };
                 
        //TODO: validate inputs here
                   
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
app.post('/walk/fromgeojson', async (req, res) => {
  
  const walkTitle = req.body.title;
  const walkDistance = req.body.distance;
  const walkTime = req.body.time;
  const walkIsFlat = (req.body.is_flat == "on");
  const walkLighting = req.body.lighting;
  const walkIsShortSightedFriendly = (req.body.is_ssf == "on");
  //const walkPhoto = req.body.photo;
  const walkIsMuddy = (req.body.is_muddy == "on");
  const walkShoes = req.body.shoes;
  const walkPath = JSON.parse(req.body.path);
  
  try {
        const data = {
            title: walkTitle, 
            distance: walkDistance, 
            time: walkTime, 
            lighting: walkLighting,
            is_flat: walkIsFlat, 
            is_ssf: walkIsShortSightedFriendly,
            is_muddy:  walkIsMuddy,
            shoes : walkShoes,
            path : walkPath
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
    return res.set('Cache-Control', 'private, max-age=300');
  } catch(error) {
    console.log('Error detecting sentiment or saving message', error.message);
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
    console.log('Error getting message details', error.message);
    return res.sendStatus(500);
  }
});

exports.api = functions.https.onRequest(app);

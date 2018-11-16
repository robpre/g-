import React from 'react';
import buggy from './Buggyfriendly.svg';
import shortsighted from './short-sightedfriendly.svg';
import wellList from './welllit.svg';
import wellies from './Wellies.svg';
import walking from './walkingbootfriendly.svg';
import trainerFriendly from './trainerfriendly.svg';
import wheelchair from './Wheelchairfriendly.svg';
import slip from './sliphazard.svg';
import flat from './flatsurface.svg';
import child from './child.svg';
import road from './road.svg';
import learnbike from './learnbike.svg';
import { GridList, GridListTile } from '@material-ui/core';

export default ({meta}) => {
    const tileData = [];

    [
        { field: 'isBuggyFriendly', name: 'Buggy friendly', image: buggy },
        { field: 'isShortSightedFriendly', name: 'Short sighted friendly', image: shortsighted },
        { field: 'isWellLit', name: 'Well lit', image: wellList },
        { field: 'isWelliesNeeded', name: 'Wellies needed', image: wellies },
        { field: 'isWalkingBootsNeeded', name: 'Walking boots needed', image: walking },
        { field: 'isTrainerFriendly', name: 'Trainer friendly', image: trainerFriendly },
        { field: 'isWheelchairFriendly', name: 'Wheelchair friendly', image: wheelchair },
        { field: 'isSlipHazard', name: 'Slip hazard', image: slip },
        { field: 'isFlatSurface', name: 'Flat surface', image: flat },
        { field: 'isChildSafe', name: 'Child safe', image: child },
        { field: 'isRoadSafe', name: 'Road safe', image: road },
        { field: 'isLearningToRideAbike', name: 'Learning to ride a bike', image: learnbike },
    ].forEach(({field, name, image}) => {
        if (meta[field]) {
            tileData.push({
                name, image
            })
        }
    });

    return (
        <GridList cellHeight={24} cols={3}>
            {tileData.map(tile => (
                <GridListTile key={tile.name} cols={1}>
                    <img src={tile.image} alt={tile.name} title={tile.name} />
                </GridListTile>
            ))}
        </GridList>
    );
};

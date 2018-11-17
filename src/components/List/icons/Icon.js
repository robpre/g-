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
import Tooltip from '@material-ui/core/Tooltip';
import { GridList, GridListTile } from '@material-ui/core';
import pickRandom from 'pick-random';

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
        <GridList cellHeight={56} cols={Math.min(5, tileData.length)}>
            {pickRandom(tileData, {count: Math.min(5, tileData.length)}).map(tile => (
                <GridListTile key={tile.name} cols={1} onClick={evt => {evt.stopPropagation(); evt.preventDefault()}} onContextMenu={evt => {evt.stopPropagation(); evt.preventDefault()}}>
                    <Tooltip title={tile.name} enterDelay={0} leaveDelay={500}>
                        <img src={tile.image} alt={tile.name} style={{ height: 56 }} />
                    </Tooltip>
                </GridListTile>
            ))}
        </GridList>
    );
};

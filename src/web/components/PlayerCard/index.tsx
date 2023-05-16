import React from 'react';
import {PlayerCardProps} from './types';
import {Card} from 'baseui/card';

const PlayerCard: React.FC<PlayerCardProps> = ({player}) => {
  return (
    <Card>{`${player.lastName}, ${player.firstName}, ${player.age}`}</Card>
  );
};

export default PlayerCard;

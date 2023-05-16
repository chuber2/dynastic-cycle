import React from 'react';
import {MainPageProps} from './types';
import {generateMockPlayers} from '../../../../__test__/data/players';
import PlayerCard from '../PlayerCard';

const MainPage: React.FC<MainPageProps> = () => {
  const players = generateMockPlayers(20);

  return (
    <>
      <main>
        {players.map((player) => (
          <>
            <PlayerCard player={player}></PlayerCard>
          </>
        ))}
      </main>
    </>
  );
};

export default MainPage;

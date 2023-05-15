import React from 'react';
import {MainPageProps} from './types';
import {generateMockPlayers} from '../../../../__test__/data/players';

const MainPage: React.FC<MainPageProps> = () => {
  const players = generateMockPlayers(20);

  return (
    <>
      <main>
        {players.map((player) => (
          <div>{`${player.lastName}, ${player.firstName}, ${player.age}`}</div>
        ))}
      </main>
    </>
  );
};

export default MainPage;

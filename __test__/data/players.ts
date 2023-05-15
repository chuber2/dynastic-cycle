import {Player} from '../../src/types/dynastic/model/dynastic';

export const generateMockPlayers = (howMany: number): Player[] => {
  const mockPlayers: Player[] = [];
  for (let i = 0; i < howMany; i++) {
    const mockPlayer: Player = {
      id: `id_${i}`,
      firstName: `First${i}`,
      lastName: `last${i}`,
      headshot: `headshortURL${i}`,
      age: i,
      isRookie: i % 2 ? true : false,
      isTradeable: i % 3 ? true : false,
      isPrime: i % 4 ? true : false,
      position: 'qb', //enum
      rank: i < howMany / 2 ? 1 : 2,
    };
    mockPlayers.push(mockPlayer);
  }
  return mockPlayers;
};

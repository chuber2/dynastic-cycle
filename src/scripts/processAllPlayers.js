import {promises as fs} from 'fs';
import _ from 'lodash';

export const processAllPlayers = async () => {
  try {
    // read the file in
    const allPlayers = await fs.readFile('./playermap.json', 'utf-8');

    // filter out what you don't want
    const playersWeWant = _.pickBy(
      allPlayers,
      (player) =>
        (player.status !== 'Inactive' && player.position === 'QB') ||
        'RB' ||
        'WR' ||
        'TE' ||
        'PI'
    );

    console.log(playersWeWant);
    // write to new file
  } catch (error) {
    console.log(error);
  }
};

await processAllPlayers();

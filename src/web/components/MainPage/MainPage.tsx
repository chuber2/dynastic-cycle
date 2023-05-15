import React from 'react';
import {MainPageProps} from './types';

const MainPage: React.FC<MainPageProps> = () => {
  return (
    <>
      <main>
        <div>player 1</div>
        <div>player 2</div>
        <div>player 3</div>
        <div>player 4</div>
      </main>
    </>
  );
};

export default MainPage;

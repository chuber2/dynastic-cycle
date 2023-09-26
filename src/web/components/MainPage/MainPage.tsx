import { Button } from 'baseui/button';
import { Card, StyledAction, StyledBody } from 'baseui/card';
import React from 'react';
import { MainPageProps } from './types';

const MainPage: React.FC<MainPageProps> = () => {
  return (
    <> 
      <main>
        <Card
          title='D.K. Metcalf'
          headerImage={undefined}
        >
          <StyledBody>
            D.K. Metcalf is 25 years old.
          </StyledBody>
          <StyledAction>
            <Button
              overrides={{
                BaseButton: { style: { width: "100%" } }
              }}
            >
              Button Label
            </Button>
          </StyledAction>
        </Card>
        <div>player 2</div>
        <div>player 3</div>
        <div>player 4</div>
      </main>
    </>
  );
};

export default MainPage;

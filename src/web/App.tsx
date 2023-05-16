import React from 'react';
import {createRoot} from 'react-dom/client';
import MainPage from './components/MainPage';

import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {DarkTheme, BaseProvider, styled} from 'baseui';

interface AppProps {}

const engine = new Styletron();

const App: React.FC<AppProps> = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <MainPage />
      </BaseProvider>
    </StyletronProvider>
  );
};

// @ts-ignore
const domNode = document.getElementById('root');
console.log('domNode', domNode);
// @ts-ignore
const root = createRoot(domNode);
const element = <App />;
root.render(element);

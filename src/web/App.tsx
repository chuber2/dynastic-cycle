import React from 'react';
import {createRoot} from 'react-dom/client';
import MainPage from './components/MainPage/MainPage';

import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { LightTheme, BaseProvider, styled } from 'baseui';
import { StatefulInput } from 'baseui/input';

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();


// 1. Create a client engine instance
const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

interface AppProps {}

// 2. Provide the engine to the app
// debug engine needs inlined source maps
const App: React.FC<AppProps> = () => {
  return(
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <BaseProvider theme={LightTheme}>
        <Centered>
        <MainPage></MainPage>;
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  ) 
};

// @ts-ignore
const domNode = document.getElementById('root');
console.log('domNode', domNode);
// @ts-ignore
const root = createRoot(domNode);
const element = <App />;
root.render(element);

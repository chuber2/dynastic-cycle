import React from 'react';
import {createRoot} from 'react-dom/client';
import MainPage from './components/MainPage/MainPage';

interface TitleProps {
  title: string; // required
  subtitle?: string; // optional
}

interface AppProps {}

// const Title: React.FC<TitleProps> = ({title, subtitle}) => {
//   return (
//     <>
//       <h1 className="hello">{title}</h1>
//       <h2>{subtitle}</h2>
//     </>
//   );
// };

const App: React.FC<AppProps> = () => {
  return <MainPage></MainPage>;
};

// @ts-ignore
const domNode = document.getElementById('root');
console.log('domNode', domNode);
// @ts-ignore
const root = createRoot(domNode);
const element = <App />;
root.render(element);

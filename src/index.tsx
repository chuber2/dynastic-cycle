import React from 'react';
import {createRoot} from 'react-dom/client';

interface TitleProps {
  title: string; // required
  subtitle?: string; // optional
}

const Title: React.FC<TitleProps> = ({title, subtitle}) => {
  return (
    <>
      <h1 className="hello">{title}</h1>
      <h2>{subtitle}</h2>
    </>
  );
};

// @ts-ignore
const domNode = document.getElementById('root');
console.log('domNode', domNode);
// @ts-ignore
const root = createRoot(domNode);
const element = <Title subtitle="there" title="hello" />;
root.render(element);

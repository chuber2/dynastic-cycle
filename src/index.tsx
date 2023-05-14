import React from 'react';

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

export default Title;

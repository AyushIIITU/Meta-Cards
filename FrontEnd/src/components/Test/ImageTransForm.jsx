// src/TransformedImage.js
import React from 'react';
import './TransformedImage.css';

const TransformedImage = ({ src, posX, posY, angle, scale }) => {
  const transformStyle = {
    transform: `translate(${posX}px, ${posY}px) rotate(${angle}deg) scale(${scale})`,
  };

  return (
    <div className="transformed-image-wrapper">
      <img src={src} alt="Transformed" className="transformed-image" style={transformStyle} />
    </div>
  );
};

export default TransformedImage;

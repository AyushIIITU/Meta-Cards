// src/ImageControls.js
import React from 'react';

const ImageControls = ({ posX, posY, angle, scale, setAngle, setScale }) => {
  const handleRotate = (e) => {
    setAngle(parseFloat(e.target.value));
  };

  const handleScale = (e) => {
    setScale(parseFloat(e.target.value));
  };

  return (
    <div className="controls">
      <label>
        Rotate:
        <input type="range" min="0" max="360" value={angle} onChange={handleRotate} />
      </label>
      <label>
        Scale:
        <input type="range" min="0.1" max="3" step="0.1" value={scale} onChange={handleScale} />
      </label>
      <div>
        <p>Position X: {posX}</p>
        <p>Position Y: {posY}</p>
      </div>
    </div>
  );
};

export default ImageControls;

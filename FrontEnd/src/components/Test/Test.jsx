// src/App.js


import { useState } from 'react';
import './App.css';
import ImageControls from './ImageControls';
import ImageCanvas from './ImageTest';
import TransformedImage from './ImageTransForm';
import IMG from '../../Images/percut_generated.jpg'

const Test = () => {
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [angle, setAngle] = useState(0);
  const [scale, setScale] = useState(1);

  return (
    <div className="App">
    <h1>Image Editor</h1>
    <div className="image-editor">
      <ImageCanvas
        posX={posX}
        posY={posY}
        angle={angle}
        scale={scale}
        setPosX={setPosX}
        setPosY={setPosY}
        setAngle={setAngle}
        setScale={setScale}
      />
      <ImageControls
        posX={posX}
        posY={posY}
        angle={angle}
        scale={scale}
        setPosX={setPosX}
        setPosY={setPosY}
        setAngle={setAngle}
        setScale={setScale}
      />
    </div>
    <div className="transformed-image-container">
      <TransformedImage
        src={IMG}
        posX={posX}
        posY={posY}
        angle={angle}
        scale={scale}
      />
    </div>
  </div>

  );
};

export default Test;

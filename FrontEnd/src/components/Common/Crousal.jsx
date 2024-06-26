import React from 'react';
import { API } from '../../Utils/Apis';

const Carousell = ({ Cdesing, handleSelectDesing }) => {
  return (
    <div>
      {Cdesing.map((img, index) => {
        const imgSrc = `${API}${img.replace(/\\/g, "/")}`;
        console.log(imgSrc);
        return (
          <img
            src={imgSrc}
            key={index}
            alt={`image ${index + 1}`}
            className="h-full w-full object-cover"
            onClick={() => handleSelectDesing(img)}
          />
        );
      })}
    </div>
  );
};

export default Carousell;

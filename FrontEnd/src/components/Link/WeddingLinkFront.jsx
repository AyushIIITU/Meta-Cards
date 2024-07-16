import React from 'react';
import style from '../cards/WCardFront.module.css';
import { API } from '../../Utils/Apis';

function WeddingLinkFront({ FrontData }) {
  const Desing = `${API}/${FrontData.IMG.replace(/\\/g, "/")}`;

  return (
    <>
      <div
        className={`${style.cover} w-full max-w-[90vw] h-full max-h-[90vh] min-h-[250px] min-w-[250px] absolute mx-auto`}
        style={{
          backgroundImage: `url(${Desing})`,
          objectFit: "cover",
          transformOrigin: "left center",
          transition: "transform 4s",
          zIndex: 1,
        }}
      >
        <img
          src={FrontData.Desing}
          className={style["cover-style"]}
        />
        <div
          className={`flex relative justify-center`}
          style={{
            bottom: `${265 + (FrontData.FontSize / 2)}px`,
            fontFamily: FrontData.FrontFont,
            padding: '0 1rem',
          }}
        >
          <h1
            className={`relative text-center`}
            style={{
              fontSize: `${FrontData.FontSize}px`,
              color: FrontData.Color,
              maxWidth: '90%',
              wordWrap: 'break-word',
            }}
          >
            {FrontData.Name}
          </h1>
        </div>
      </div>
    </>
  );
}

export default WeddingLinkFront;

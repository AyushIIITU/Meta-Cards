import React from 'react';
import style from '../cards/WCardFront.module.css';
import { API } from '../../Utils/Apis';

function WeddingLinkFront({ FrontData }) {
//   console.log(FrontData);
  const Desing = `${API}/${FrontData.IMG.replace(/\\/g, "/")}`;
//   console.log(Desing);

  return (
    <>
      <div
        className={`${style.cover} w-[500px] h-[500px] absolute mx-auto`}
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
              style={{bottom:`${265 + (FrontData.FontSize) / 2}px` ,fontFamily: FrontData.FrontFont }}
            >
        <h1
          className={`relative text-center`}
          style={{
            fontSize: `${(FrontData.FontSize) }px`,
            color: FrontData.Color,
          }}
        >
          {FrontData.Name}
        </h1></div>
      </div>
    </>
  );
}

export default WeddingLinkFront;

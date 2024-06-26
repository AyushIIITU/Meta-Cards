import React from 'react'
// import Carousel from '../Common/Crousal';
import { API } from '../../Utils/Apis';
import { CornerDesine } from '../../Constants/DesingConstants';
import Carousell from '../Common/Crousal';
import Carousel from '../Common/Crousal2';
import Crousal3 from '../Common/Crousal3';

function Test2() {

    // const Cdesing = ["d1", "d2", "d3", "d4", "d5"];
    const handleSelectDesing = (design) => {
      console.log("Selected design:", design);
    };
  return (
    // <Carousell Cdesing={CornerDesine} API={API} handleSelectDesing={handleSelectDesing} />
    // <div className="max-w-lg">
    <Crousal3/>
  //   <Carousel autoSlide={false}>
  //   {CornerDesine.map((s, index) => {
  //     const imgSrc = `${API}${s.replace(/\\/g, "/")}`;
  //     return (
  //       <img src={imgSrc} style={{border:'solid red 2px'}} onClick={handleSelectDesing} className="h-[80%] w-[80%] gap-[20%] object-cover" alt={`Slide ${index}`} key={index} />
  //     );
  //   })}
  // </Carousel>
  )
}

export default Test2
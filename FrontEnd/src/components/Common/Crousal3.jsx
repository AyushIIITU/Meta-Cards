import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CornerDesine } from '../../Constants/DesingConstants';
import { API } from '../../Utils/Apis';

const Crousal3 = ({Image,handleSelectDesing}) => {

  return (
    <Carousel
  additionalTransfrom={0}
  arrows
  autoPlaySpeed={3000}
  centerMode={false}
  className=""
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  }}
  rewind={false}
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
  showDots={false}
  sliderClass=""
  slidesToSlide={1}
  swipeable
>
{Image.map((img, index) => {
        const imgSrc = `${API}${img.replace(/\\/g, "/")}`;
        // console.log(imgSrc);
        return (
          <img
            src={imgSrc}
            key={index}
            alt={`image ${index + 1}`}
            onClick={()=>handleSelectDesing(imgSrc)}
            className="h-full w-full object-cover"
            
          />
        );
      })}
    </Carousel>
  );
};

export default Crousal3;

import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import BirthDayGif from "../../Video/BirthDay.mp4";
import WeddingGif from "../../Video/Wedding.mp4";
import FormalCard from "../../Video/Formal_Card.mp4";
import { config } from "react-spring";



const Test3dCrousal = () => {
  const [goToSlide, setGoToSlide] = useState(0);
  const autoSlideTimeout = useRef(null);
  const slides = [
    {
      key: uuidv4(),
      content:  <video
      loading="lazy"
      muted="muted"
      src={BirthDayGif}
      type="video/mp4"
      autoPlay="autoplay"
      loop="loop"
      style={{
        maxHeight: "50vh",
        borderTopLeftRadius: `10px`,
        borderTopRightRadius: `10px`,
      }}
    ></video>,
    },
    {
      key: uuidv4(),
      content: <video
      loading="lazy"
      muted="muted"
      src={FormalCard}
      type="video/mp4"
      autoPlay="autoplay"
      loop="loop"
      style={{
        maxHeight: "50vh",
        borderTopLeftRadius: `10px`,
        borderTopRightRadius: `10px`,
      }}
    ></video>,
    },
    {
      key: uuidv4(),
      content: <video
      loading="lazy"
      muted="muted"
      src={WeddingGif}
      type="video/mp4"
      autoPlay="autoplay"
      loop="loop"
      style={{
        maxHeight: "50vh",
        borderTopLeftRadius: `10px`,
        borderTopRightRadius: `10px`,
      }}
    ></video>,
    },
  ].map((slide, index) => {
    return { ...slide, onClick: () => setGoToSlide(index) };
  });
  const resetAutoSlideTimeout = () => {
    if (autoSlideTimeout.current) {
      clearTimeout(autoSlideTimeout.current);
    }
    autoSlideTimeout.current = setTimeout(() => {
      setGoToSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  useEffect(() => {
    resetAutoSlideTimeout();
    return () => {
      if (autoSlideTimeout.current) {
        clearTimeout(autoSlideTimeout.current);
      }
    };
  }, [goToSlide]);

  return (
    <div style={{ width: "80%", height: "500px", margin: "0 auto" }}>
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={2}
        animationConfig={config.slow}
      />
    </div>
  );
};

export default Test3dCrousal;

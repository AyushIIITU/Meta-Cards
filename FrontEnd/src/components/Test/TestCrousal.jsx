import { useState, useEffect, useRef } from "react";
import BirthDayGif from "../../Video/Birth-DAY.mp4";
import WeddingGif from "../../Video/Wedding-Card.mp4";
import FormalCard from "../../Video/Wish-Card.mp4";
import styles from "./TestCarousel.module.css";

const TestCarousel = () => {
  const [currdeg, setCurrdeg] = useState(0);
  const autoplayIntervalRef = useRef(null);
  const carouselRef = useRef(null);

  const rotate = (direction) => {
    if (direction === "n") {
      setCurrdeg((prev) => prev - 120);
    } else if (direction === "p") {
      setCurrdeg((prev) => prev + 120);
    }
  };

  const startAutoplay = () => {
    autoplayIntervalRef.current = setInterval(() => {
      rotate("n");
    }, 4000); // Adjust the interval as needed
  };

  const stopAutoplay = () => {
    clearInterval(autoplayIntervalRef.current);
  };

  useEffect(() => {
    startAutoplay();

    const carouselElement = carouselRef.current;
    carouselElement.addEventListener("mouseenter", stopAutoplay);
    carouselElement.addEventListener("mouseleave", startAutoplay);

    return () => {
      stopAutoplay();
      carouselElement.removeEventListener("mouseenter", stopAutoplay);
      carouselElement.removeEventListener("mouseleave", startAutoplay);
    };
  }, []);

  return (
    <div className="my-0 mx-auto w-[200px] h-[200px] relative" style={{ perspective: '1000px' }}>
      <div
        className="h-full w-full absolute transform transition-transform duration-1000"
        style={{ transform: `rotateY(${currdeg}deg)`, transformStyle: 'preserve-3d' }}
        ref={carouselRef}
      >
        <div className={`${styles.item} ${styles.a}`}><video
          loading="lazy"
          muted="muted"
          src={BirthDayGif}
          type="video/mp4"
          autoPlay="autoplay"
          loop="loop"
          style={{
            maxHeight: "50vh",
            borderRadius: `10px`,
          }}
        ></video></div>
        <div className={`${styles.item} ${styles.b}`}><video
          loading="lazy"
          muted="muted"
          src={FormalCard}
          type="video/mp4"
          autoPlay="autoplay"
          loop="loop"
          style={{
            maxHeight: "50vh",
            borderRadius: `10px`,
          }}
        ></video></div>
        <div className={`${styles.item} ${styles.c}`}> <video
          loading="lazy"
          muted="muted"
          src={WeddingGif}
          type="video/mp4"
          autoPlay="autoplay"
          loop="loop"
          style={{
            maxHeight: "50vh",
            borderRadius: `10px`,
            // borderTopRightRadius: `10px`,
          }}
        ></video></div>
      </div>
    </div>
  );
};

export default TestCarousel;

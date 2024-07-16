import React, { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.css";

const CoustomCrousal = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      const activeSlide = images[currentSlide].alt;
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        alert(activeSlide);
      }, 1500);
    };

    const handleTouchStart = (e) => {
      if (!sliderRef.current) return;
      const touchStartX = e.touches[0].pageX;
      const touchStartY = e.touches[0].pageY;

      const handleTouchMove = (moveEvent) => {
        const touchEndX = moveEvent.changedTouches[0].pageX;
        const touchEndY = moveEvent.changedTouches[0].pageY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }

        sliderRef.current.removeEventListener("touchmove", handleTouchMove);
        sliderRef.current.removeEventListener("touchend", handleTouchEnd);
      };

      const handleTouchEnd = () => {
        sliderRef.current.removeEventListener("touchmove", handleTouchMove);
        sliderRef.current.removeEventListener("touchend", handleTouchEnd);
      };

      sliderRef.current.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      sliderRef.current.addEventListener("touchend", handleTouchEnd);
    };

    const sliderElement = sliderRef.current;
    sliderElement.addEventListener("wheel", handleWheel);
    sliderElement.addEventListener("touchstart", handleTouchStart);

    return () => {
      sliderElement.removeEventListener("wheel", handleWheel);
      sliderElement.removeEventListener("touchstart", handleTouchStart);
    };
  }, [currentSlide, images]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500); // Adjust the time to match your CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div id="slider" className={styles.slider} ref={sliderRef}>
      <div className={styles.slider__inner}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`${styles.slider__image} ${
              styles[`image--${index + 1}`]
            } ${currentSlide === index ? styles.active : ""}`}
            data-index={index + 1}
          />
        ))}
      </div>
      <div className={styles.slider__action}>
        <div
          id="prev"
          className={`${styles.slider__button} ${styles[`slider__button--prev`]}`}
          onClick={prevSlide}
        >
          <i className="fas fa-angle-left"></i>
        </div>
        <div
          id="next"
          className={`${styles.slider__button} ${styles[`slider__button--next`]}`}
          onClick={nextSlide}
        >
          <i className="fas fa-angle-right"></i>
        </div>
      </div>
    </div>
  );
};

export default CoustomCrousal;

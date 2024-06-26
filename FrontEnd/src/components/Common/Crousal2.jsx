import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

const Carousel = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) => {
    const [curr, setCurr] = useState(0);

    const prev = () => setCurr(curr === 0 ? slides.length - 1 : curr - 1);
    const next = () => setCurr(curr === slides.length - 1 ? 0 : curr + 1);

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval]);

    return (
        <div className="overflow-hidden max-w-[25%] relative">
            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={prev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                    <ChevronLeft />
                </button>
                <button onClick={next} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                    <ChevronRight />
                </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`transition-all w-3 h-3 rounded-full ${curr === i ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;

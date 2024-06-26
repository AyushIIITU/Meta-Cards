// src/ImageCanvas.js
import React, { useRef, useEffect, useState } from 'react';
import './ImageCanvas.css';

const ImageCanvas = ({ posX, posY, angle, scale, setPosX, setPosY, setAngle, setScale }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = 'https://picsum.photos/200/300'; // Replace with your image path
    img.onload = () => {
      setImage(img);
      drawImage(ctx, img, posX, posY, angle, scale);
    };
  }, [posX, posY, angle, scale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    if (image) {
      const ctx = canvas.getContext('2d');
      drawImage(ctx, image, posX, posY, angle, scale);
    }
  }, [image, posX, posY, angle, scale]);

  const drawImage = (ctx, img, x, y, angle, scale) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastX(e.clientX);
    setLastY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    setPosX(posX + dx);
    setPosY(posY + dy);
    setLastX(e.clientX);
    setLastY(e.clientY);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawImage(ctx, image, posX + dx, posY + dy, angle, scale);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setLastX(touch.clientX);
    setLastY(touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const dx = touch.clientX - lastX;
    const dy = touch.clientY - lastY;

    setPosX(posX + dx);
    setPosY(posY + dy);
    setLastX(touch.clientX);
    setLastY(touch.clientY);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawImage(ctx, image, posX + dx, posY + dy, angle, scale);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div ref={containerRef} className="canvas-container">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default ImageCanvas;

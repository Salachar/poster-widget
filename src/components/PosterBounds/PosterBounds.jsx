import React, { useState } from 'react';
import { PosterText } from '../PosterText/PosterText';

export const PosterBounds = ({
  posterConfig = {},
  image = {},
  imageWidth,
  imageHeight,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.poster-text')) {
      return;
    }
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x * (posterConfig.zoom || 1),
      y: e.clientY - position.y * (posterConfig.zoom || 1),
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: (e.clientX - startPosition.x) / (posterConfig.zoom || 1),
        y: (e.clientY - startPosition.y) / (posterConfig.zoom || 1),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        width: `${window.POSTER_WIDTH * 0.75}px`,
        height: `${window.POSTER_HEIGHT * 0.75}px`,
        outline: '5px solid #ed4545',
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden',
      }}
      className="poster-bounds"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        style={{
          width: `${imageWidth * posterConfig.imageScale}px`,
          height: `${imageHeight * posterConfig.imageScale}px`,
          backgroundColor: `rgba(0, 0, 0, ${1 - (posterConfig.brightness / 100 || 0)})`,
          position: 'fixed',
          top: '0',
          left: '0',
          maxWidth: 'none',
          zIndex: -1,
        }}
      />
      <img
        src={image.src}
        width={imageWidth * posterConfig.imageScale}
        height={imageHeight * posterConfig.imageScale}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          maxWidth: 'none',
          zIndex: -2,
        }}
        alt=""
      />
      <PosterText
        posterConfig={posterConfig}
      />
    </div>
  );
}

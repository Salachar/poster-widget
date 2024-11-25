import React, { useEffect, useState } from 'react';

import { PosterText } from '../PosterText/PosterText';

import config from '../../config';

export const PosterBounds = ({
  posterConfig = {
    imageScale: 1,
    brightness: 0,
    zoom: 1,
  },
  image = {},
  imageWidth = 0,
  imageHeight = 0,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [scaledDimensions, setScaledDimensions] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const scale = posterConfig.imageScale || 1;
    const width = imageWidth * scale;
    const height = imageHeight * scale;
    setScaledDimensions({
      width: !isNaN(width) ? width : 0,
      height: !isNaN(height) ? height : 0,
    });
  }, [imageWidth, imageHeight, posterConfig.imageScale]);

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
        width: `${config.poster.width}px`,
        height: `${config.poster.height}px`,
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
          width: `${scaledDimensions.width}px`,
          height: `${scaledDimensions.height}px`,
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
        width={scaledDimensions.width}
        height={scaledDimensions.height}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          maxWidth: 'none',
          zIndex: -2,
        }}
        alt=""
      />
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(40, 40, 40, 1)',
          zIndex: -3,
          transform: 'scale(10)',
        }}
      />
      <PosterText
        posterConfig={posterConfig}
      />
    </div>
  );
}

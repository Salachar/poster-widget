import React, { useEffect, useState } from 'react';
import { PosterBounds } from '../PosterBounds/PosterBounds';

export const Poster = ({ posterConfig }) => {
  const [image, setImage] = useState({});
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const checkImageSize = (e) => {
    if (!e.target.width || !e.target.height) {
      return;
    }
    if (e.target.width < window.POSTER_WIDTH || e.target.height < window.POSTER_HEIGHT) {
      const widthRatio = window.POSTER_WIDTH / e.target.width;
      const heightRatio = window.POSTER_HEIGHT / e.target.height;
      const scale = Math.max(widthRatio, heightRatio);
      setImageWidth(e.target.width * scale);
      setImageHeight(e.target.height * scale);
    } else {
      setImageWidth(e.target.width);
      setImageHeight(e.target.height);
    }
  }

  useEffect(() => {
    if (posterConfig.image) {
      setImage(posterConfig.image);
    }
  }, [posterConfig]);

  return (
    <div
      id="poster"
      style={{
        zoom: posterConfig.zoom,
        minWidth: `${window.POSTER_WIDTH}px`,
        minHeight: `${window.POSTER_HEIGHT}px`,
        position: 'relative',
      }}
    >
      <img
        key={image.name}
        src={image.src}
        onLoad={(e) => {
          checkImageSize(e);
        }}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
        alt=""
      />

      <PosterBounds
        posterConfig={posterConfig}
        image={image}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
      />
    </div>
  )
}

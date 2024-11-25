import React, { useEffect, useState } from 'react';

import { PosterBounds } from '../PosterBounds/PosterBounds';

import config from '../../config';

export const Poster = ({ posterConfig }) => {
  const [image, setImage] = useState({});
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const checkImageSize = (e) => {
    if (!e.target.width || !e.target.height) {
      return;
    }
    if (e.target.width < config.width || e.target.height < config.height) {
      const widthRatio = config.width / e.target.width;
      const heightRatio = config.height / e.target.height;
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
        minWidth: `${config.width}px`,
        minHeight: `${config.height}px`,
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

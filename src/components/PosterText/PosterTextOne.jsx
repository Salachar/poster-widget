import React from 'react';
import Draggable from 'react-draggable';

const textStyles = {
  color: 'white',
  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.6)',
  fontFamily: 'Arial',
};

export const PosterText = ({
  posterConfig = {},
}) => {
  const {
    title = '',
    titleSize = '72',
    subtitle = '',
    dividerColor = 'white',
    posterType = '',
  } = posterConfig;

  return (
    <Draggable cancel=".non-draggable">
      <div
        className="poster-text"
        style={{
          padding: '24px',
        }}
      >
        {title && (
          <div
            style={{
              ...textStyles,
              fontSize: `${titleSize}px`,
              lineHeight: `${titleSize}px`,
              fontWeight: 'bold',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
        )}
        {subtitle && (
          <div
            style={{
              ...textStyles,
              fontSize: '36px',
              lineHeight: '36px',
              fontWeight: 'bold',
              margin: '16px 0',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            {subtitle}
          </div>
        )}
        <div
          style={{
            height: '4px',
            backgroundColor: dividerColor,
            marginBottom: '12px',
            width: '200px',
            margin: '16px 0 20px 0',
          }}
        />
        {posterType && (
          <div
            style={{
              ...textStyles,
              fontSize: '46px',
              lineHeight: '46px',
              letterSpacing: '2px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            {posterType}
          </div>
        )}
      </div>
    </Draggable>
  );
}

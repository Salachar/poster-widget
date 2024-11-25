import React from 'react';
import { Box } from '@chakra-ui/react';

import {
  getTitleBackgroundColor,
  getCollectionTextColor,
} from '../../utils/color';

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
    dividerColor,
    posterType = '',
  } = posterConfig;

  const titleBackgroundColor = getTitleBackgroundColor(dividerColor);

  return (
    <Box
      className="poster-text"
      position="absolute"
      bottom="0"
      left="0"
      right="0"
    >
      <Box
        height="20px"
        background={`linear-gradient(to top, ${titleBackgroundColor} 0%, transparent 100%)`}
      />
      <Box
        backgroundColor={titleBackgroundColor}
        padding="24px 24px 24px 24px"
      >
        {title && (
          <Box
            {...textStyles}
            fontSize={`${titleSize}px`}
            lineHeight={`${titleSize}px`}
            fontWeight="bold"
            letterSpacing="3px"
            textTransform="uppercase"
            fontFamily="Oswald"
          >
            {title}
          </Box>
        )}
        {subtitle && (
          <Box
            {...textStyles}
            fontSize="46px"
            lineHeight="46px"
            fontWeight="400"
            margin="8px 0 0 0"
            letterSpacing="2px"
            textTransform="uppercase"
            fontFamily="Oswald"
          >
            {subtitle}
          </Box>
        )}
      </Box>
      {posterType && (
        <Box
          {...textStyles}
          fontSize="46px"
          lineHeight="46px"
          letterSpacing="3px"
          fontWeight="bold"
          textTransform="uppercase"
          backgroundColor="rgba(40, 40, 40, 1)"
          color={getCollectionTextColor(dividerColor)}
          padding="12px 24px"
          fontFamily="JetBrains Mono"
        >
          {posterType}
        </Box>
      )}
    </Box>
  )
}

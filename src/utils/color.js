import Color from 'color';

export const getTitleBackgroundColor = (posterColor) => {
  /*
    - posterColor is a Color object
    - title is always white
  */

  try {
    let titleColor = posterColor;
    let contrastRatio = titleColor.contrast(Color('white'));
    while (contrastRatio < 10) {
      titleColor = titleColor.darken(0.1);
      contrastRatio = titleColor.contrast(Color('white'));
    }
    return titleColor.rgb().alpha(0.65).string();
  } catch (e) {
    return 'rgba(0, 0, 0, 0.75)';
  }
}

export const getCollectionTextColor = (posterColor) => {
  /*
    - posterColor is a Color object
    - collection background is rgba(40, 40, 40, 1)
    - return bright version of posterColor
  */

  try {
    const bg = Color('rgba(40, 40, 40, 1)');
    let textColor = posterColor;
    let contrastRatio = textColor.contrast(bg);
    while (contrastRatio < 6) {
      textColor = textColor.lighten(0.1);
      contrastRatio = textColor.contrast(bg);
    }
    return textColor.rgb().string();
  } catch (e) {
    return 'rgba(255, 255, 255, 0.85)';
  }
}

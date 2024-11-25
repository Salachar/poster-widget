const toAlphanumeric = (str) => {
  let newStr = "";
  newStr = str.replace(/[^a-zA-Z0-9 ]/g, "");
  newStr = newStr.replace(/\s/g, "_");
  newStr = newStr.toLowerCase();
  newStr = newStr.trim();
  return newStr;
};

export const getNewImageName = ({
  title = '',
  subtitle = '',
  posterType = '',
}) => {
  /*
    title = "The Best Movie Ever"
    subtitle = "A Movie About Movies"
    posterType = "collection"
    imageName = "thebestmovieever_amovieaboutmovies_collection.png"
  */

  let imageName = "";
  const titleChunks = [];
  if (title) titleChunks.push(toAlphanumeric(title));
  if (subtitle) titleChunks.push(toAlphanumeric(subtitle));
  if (posterType) titleChunks.push(toAlphanumeric(posterType));
  imageName = titleChunks.join("_");
  imageName += ".png";
  return imageName;
};

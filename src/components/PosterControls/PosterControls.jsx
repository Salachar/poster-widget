import { Box, Button, Text, Input } from "@chakra-ui/react";
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { FastAverageColor } from 'fast-average-color';
import Color from 'color';
import NumberInput from '../NumberInput/NumberInput';

/*
  Color (fac.getColor) example output:
  {
    "value": [
      54,
      87,
      110,
      255
    ],
    "rgb": "rgb(54,87,110)",
    "rgba": "rgba(54,87,110,1)",
    "hex": "#36576e",
    "hexa": "#36576eff",
    "isDark": true,
    "isLight": false
  }
*/

export const PosterControls = ({
  setPosterConfig = () => {},
}) => {
  const [image, setImage] = useState(null);
  const [zoom, setZoom] = useState(0.5);
  const [brightness, setBrightness] = useState(100);
  const [imageScale, setImageScale] = useState(1);
  const [title, setTitle] = useState('');
  const [titleSize, setTitleSize] = useState(92);
  const [subtitle, setSubtitle] = useState('');
  const [dividerColor, setDividerColor] = useState(Color('white'));
  const [posterType, setPosterType] = useState('collection');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Get the dominant color of the image
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const fac = new FastAverageColor();
        const color = fac.getColor(img);
        let dominantColor = Color(color.rgb);
        setDividerColor(dominantColor);
      };
      // Reset the image scale on a new image
      setImageScale(1);
      // Set the image state
      setImage({
        name: file.name,
        src: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Send a config update when anything at all changes
  useEffect(() => {
    setPosterConfig({
      image,
      zoom,
      brightness,
      imageScale,
      title,
      titleSize,
      subtitle,
      dividerColor,
      posterType,
    });
  }, [
    image,
    zoom,
    brightness,
    imageScale,
    title,
    titleSize,
    subtitle,
    dividerColor,
    posterType
  ]);

  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      p="4"
      width="300px"
      backgroundColor="white"
      boxShadow="md"
      borderRadius="md"
    >
      <Box
        border="2px dashed #ccc"
        borderRadius="md"
        textAlign="center"
        p="4"
        mb="4"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Text>Drag & drop an image here, or click to select one</Text>
      </Box>

      <NumberInput
        label="Zoom"
        value={zoom}
        onChange={(value) => {
          // Ensure the zoom value is limited to 2 decimal places
          // Was getting weird float values like 0.30000000000000004
          value = parseFloat(value.toFixed(2));
          setZoom(value);
        }}
        min={0.1}
        max={2}
        step={0.05}
        style={{ mb: '4' }}
      />

      <NumberInput
        label="Brightness"
        value={brightness}
        onChange={setBrightness}
        min={0}
        max={100}
        step={5}
        style={{ mb: '4' }}
      />

      <NumberInput
        label="Image Scale"
        value={imageScale}
        onChange={(value) => {
          // Ensure the zoom value is limited to 2 decimal places
          value = parseFloat(value.toFixed(2));
          setImageScale(value);
        }}
        min={0.1}
        max={5}
        step={0.01}
        style={{ mb: '4' }}
      />

      <Box mb="4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>

      <Box mb="4">
        <NumberInput
          value={titleSize}
          onChange={setTitleSize}
          min={24}
          max={92}
          step={1}
        />
      </Box>

      <Box mb="4">
        <Input
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </Box>

      <Box mb="4">
        <Input
          type="color"
          value={dividerColor.hex()}
          // onChange={(e) => setDividerColor(e.target.value)}
          onChange={(e) => setDividerColor(Color(e.target.value))}
        />
      </Box>

      <Box mb="4">
        <Input
          placeholder="Poster Type"
          value={posterType}
          onChange={(e) => setPosterType(e.target.value)}
        />
      </Box>

      <Button
        colorScheme="blue"
        width="100%"
        onClick={() => {
          const style = document.createElement('style');
          const poster = document.getElementById('poster');
          const currentZoom = poster.style.zoom;
          poster.style.zoom = '1';
          document.head.appendChild(style);
          style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');
          const posterBounds = document.querySelector('.poster-bounds');
          html2canvas(posterBounds).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'poster.png';
            link.click();
            style.remove();
            poster.style.zoom = currentZoom;
          });
        }}
      >
        Save
      </Button>
    </Box>
  );
}

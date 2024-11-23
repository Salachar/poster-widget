import { HStack, Button, Input, Text, VStack } from "@chakra-ui/react";

import './NumberInput.css';

const NumberInput = ({
  value,
  label = '',
  onChange = () => {},
  min = 0,
  max = 100,
  step = 1,
  style = {},
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  return (

    <VStack
      width="100%"
      alignItems="flex-start"
      gap="0"
      {...style}
    >
      {label && <Text>{label}</Text>}
      <HStack>
        <Button
          onClick={handleDecrement}
        >
          -
        </Button>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          textAlign="center"
          className="custom-number-input"
        />
        <Button
          onClick={handleIncrement}
        >
          +
        </Button>
      </HStack>
    </VStack>
  );
};

export default NumberInput;

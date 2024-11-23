import { HStack, Button, Input, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect, useRef } from 'react';

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
  const intervalIdRef = useRef(null);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const handleIncrement = () => {
    if (valueRef.current < max) {
      onChange(valueRef.current + step);
    }
  };

  const handleDecrement = () => {
    if (valueRef.current > min) {
      onChange(valueRef.current - step);
    }
  };

  const startIncrement = () => {
    handleIncrement();
    intervalIdRef.current = setInterval(handleIncrement, 250);
  };

  const startDecrement = () => {
    handleDecrement();
    intervalIdRef.current = setInterval(handleDecrement, 250);
  };

  const stopInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopInterval();
    };
  }, []);

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
          onMouseDown={startDecrement}
          onMouseUp={stopInterval}
          onMouseLeave={stopInterval}
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
          onMouseDown={startIncrement}
          onMouseUp={stopInterval}
          onMouseLeave={stopInterval}
        >
          +
        </Button>
      </HStack>
    </VStack>
  );
};

export default NumberInput;

// import { HStack, Button, Input, Text, VStack } from "@chakra-ui/react";

// import './NumberInput.css';

// const NumberInput = ({
//   value,
//   label = '',
//   onChange = () => {},
//   min = 0,
//   max = 100,
//   step = 1,
//   style = {},
// }) => {
//   const handleIncrement = () => {
//     if (value < max) {
//       onChange(value + step);
//     }
//   };

//   const handleDecrement = () => {
//     if (value > min) {
//       onChange(value - step);
//     }
//   };

//   return (

//     <VStack
//       width="100%"
//       alignItems="flex-start"
//       gap="0"
//       {...style}
//     >
//       {label && <Text>{label}</Text>}
//       <HStack>
//         <Button
//           onClick={handleDecrement}
//         >
//           -
//         </Button>
//         <Input
//           type="number"
//           value={value}
//           onChange={(e) => onChange(Number(e.target.value))}
//           textAlign="center"
//           className="custom-number-input"
//         />
//         <Button
//           onClick={handleIncrement}
//         >
//           +
//         </Button>
//       </HStack>
//     </VStack>
//   );
// };

// export default NumberInput;

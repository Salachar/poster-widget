import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import { Poster } from "./components/Poster/Poster";
import { PosterControls } from "./components/PosterControls/PosterControls";

const App = () => {
  const [posterConfig, setPosterConfig] = useState({});

  return (
    <ChakraProvider value={defaultSystem}>
      <Box>
        <Poster
          posterConfig={posterConfig}
        />
        <PosterControls
          posterConfig={posterConfig}
          setPosterConfig={setPosterConfig}
        />
      </Box>
    </ChakraProvider>
  )
}

export default App;

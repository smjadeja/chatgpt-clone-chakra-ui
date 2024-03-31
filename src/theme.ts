import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        fontSize: "14px",
      },
    },
  },
});

export default theme;

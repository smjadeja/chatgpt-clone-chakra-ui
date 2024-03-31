import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import  "../index.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime :15*(60*1000),      
      refetchOnWindowFocus:false,
      refetchOnReconnect: false
    },
  },
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      <RouterProvider router={router}>

      </RouterProvider>

      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

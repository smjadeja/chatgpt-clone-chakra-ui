import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
      <>
      
      <Box padding={5}>
        <Heading>Opps</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "Something went wrong."}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
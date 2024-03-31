import {
  Grid,
  Show,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import SideBar from "../components/SideBar";
import ModelSelector from "../components/ModelSelector";
import FooterInput from "../components/FooterInput";
import Conversation from "../components/Conversation";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        lg: `"aside main"`,
        base: `"main"`,
      }}
      gridTemplateRows={"1fr"}
      gridTemplateColumns={{ lg: "250px 1fr", base: "1fr" }}
      w="100%"
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem
          area="aside"
          height="100vh"
          w="250px" // Ensure the sidebar takes full viewport height
          zIndex={1}
        >
          <SideBar/>
        </GridItem>
      </Show>
      <GridItem  area="main" w="100%">
        <Flex padding={4} height="100vh" flexDirection="column">
          <ModelSelector />

         <Conversation />
         
          <FooterInput/>
          
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default HomePage;

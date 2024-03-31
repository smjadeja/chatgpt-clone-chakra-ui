import {
  Box,
  Button,
  Menu,
  RadioGroup,
  Radio,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  VStack,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import  { useState } from "react";
import { IoFlashOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

const ModelSelector = () => {
  const {colorMode} = useColorMode()
  const modelObjects = [{
    id : "1",
    name : "GPT-3.5"
  }, {
    id : "2",
    name : "GPT-4"
  }
]
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel,setSelectedModel] = useState("");
  console.log(selectedModel)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (    
    <Box  display={"flex"} alignItems={"start"} justifyContent={{base:"center", lg:"start"}} height="60px" width="100%">    
    <Menu closeOnBlur={true}  isOpen={isOpen}>
      <MenuButton   color={colorMode == "light" ? "gray.600" : ""} bg={colorMode == "light" ? "gray.200" : "gray.700"}
          _hover={ colorMode =="dark" ? { backgroundColor: "gray.600", cursor: "pointer" } : { backgroundColor: "gray.300", cursor: "pointer" }}  rightIcon={<FaChevronDown />} as={Button} onClick={toggleMenu}>
      {selectedModel ? "Open" + modelObjects.find(model => model.id === selectedModel)?.name : "Select Model"}
      
      </MenuButton>
      <MenuList >
        <RadioGroup  onClick={toggleMenu} value={selectedModel}>
          <MenuItem onClick={() => setSelectedModel("1")} >

            <HStack>
            <IoFlashOutline />
              <VStack alignItems={"start"}>
                <Text>OpenGPT-3.5</Text>
                <Text>Great for every day tasks.</Text>
              </VStack>
              <Radio checked={selectedModel === "1"} value="1" />
            </HStack>
          </MenuItem>

          <MenuItem onClick={() => setSelectedModel("2")} >
            <HStack>
            <BsStars />
              <VStack alignItems={"start"}>
                <Text>OpenGPT-4</Text>
                <Text>Our most capable model.</Text>
              </VStack>
              <Radio checked={selectedModel === "2"}  value={"2"} />
            </HStack>
          </MenuItem>
        </RadioGroup>
      </MenuList>
    </Menu>
  </Box>
  );
};

export default ModelSelector;

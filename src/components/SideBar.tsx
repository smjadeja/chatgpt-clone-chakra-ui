import {
  Flex,
  Box,
  Button,
  Text,
  List,
  ListItem,
  Circle,
  Heading,
  HStack,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorMode
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import useConversationStore from "../state-management/ConversationStore/store";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import SettingModal from "./SettingModal";
const Sidebar = () => {
  const {colorMode} = useColorMode()
  const {isOpen,onClose,onOpen} = useDisclosure()
  const {
    resetConversation,
    conversationList,
    selectConversation,
    removeConversation,
  } = useConversationStore((s) => ({
    resetConversation: s.resetConversation,
    conversationList: s.conversationList,
    selectConversation: s.selectConversation,
    removeConversation: s.removeConversation,
  }));

  const [hoveredItem, selectHoveredItem] = useState({ id: "", hovered: false });
  return (
    <>
    <SettingModal isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
    <Flex height="100vh" flexDirection="column" bg={colorMode == "dark" ? "gray.700" : "gray.100"} >
      <Box 
        padding={4}
        display={"flex"}
        alignItems={"start"}
        height="60px"
        width="100%"
      >
        <Button
          onClick={resetConversation}
          blur={"4px"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingLeft={2}
          paddingRight={2}          
          bg={colorMode == "light" ? "gray.200" : "gray.600"}
          _hover={ colorMode =="dark" ? { backgroundColor: "whiteAlpha.400", cursor: "pointer" } : { backgroundColor: "gray.300", cursor: "pointer" }}
        >
          <HStack
            display={"flex"}
            alignContent={"center"}
            verticalAlign={"middle"}
            alignItems={"center"}
            color={colorMode == "light" ? "gray.600" : ""}
          >
            <TbFidgetSpinner size={"22px"} />
            <Heading size="xs">New Chat </Heading>
          </HStack>
          <EditIcon />
        </Button>
      </Box>
      <Flex
        width={"100%"}
        flex="1"
        padding={2}
        overflowY="auto"
        overflowX={"hidden"}
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#e3e3e3",
            borderRadius: "24px",
          },
        }}
      >
        {/* Content for the scrollable center box */}

        <Box display={"flex"} flex="1">
          {/* Scrollable content here */}
          <List width={"100%"} overflow={"hidden"} colorScheme="gray">
            {conversationList.map((item, index) => (
              <ListItem
                borderRadius={5}
                onClick={() => selectConversation(item.id)}
                paddingLeft={0}
                
                padding={2}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                key={index}
                width={"100%"}
                onMouseEnter={() =>
                  selectHoveredItem({ id: item.id, hovered: true })
                }
                onMouseLeave={() =>
                  selectHoveredItem({ id: "", hovered: false })
                }
              >
                <HStack position={"relative"} justifyContent={"space-between"}>
                  <Text
                    textOverflow={"ellipsis"}
                    as={"span"}
                    whiteSpace={"nowrap"}
                  >
                    {item.title.slice(0, 33)}
                    {item.title.length > 34 ? "..." : ""}
                  </Text>
                  {hoveredItem.hovered && hoveredItem.id === item.id && (
                    <Box
                    width={"44px"}
                    display={"flex"}
                    justifyContent={"end"}
                    bg={colorMode == "dark" ?  "gray.700" : ""}
                    position={"absolute"}
                    right={"2px"}
                    
                    >
                      <Button
                        onClick={() => removeConversation(item.id)}
                        padding={0}
                        size={"xs"}
                      >
                        <RiDeleteBin6Line />
                      </Button>
                    </Box>
                  )}
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      </Flex>
      <Box
        padding={4}
        display={"flex"}
        alignItems={"center"}
        height="80px"
        width="100%"
      >
        {/* <List width={"100%"} spacing={3}>
          <ListItem
            padding={0}
            _hover={{ cursor: "pointer" }}
            borderRadius="md"
          >
            <Button
              paddingLeft={1}
              paddingTop={2}
              paddingBottom={2}
              w="100%"
              background={"inherit"}
              justifyContent={"start"}
            >
              <Circle size="30px" bg="tomato" color="white">
                S
              </Circle>
              <Text marginLeft={2} fontSize={"14px"}>
                Shaktiraj
              </Text>
            </Button>
          </ListItem>
        </List> */}
        <Menu>
          <MenuButton
          bg={colorMode == "light" ? "gray.200" : "gray.600"}
            _active={colorMode =="dark" ? { backgroundColor: "whiteAlpha.400" } : {backgroundColor:"gray.300"}}
            _selected={colorMode =="dark" ? { backgroundColor: "whiteAlpha.400" } : { backgroundColor: "gray.200" }}
            _hover={ colorMode =="dark" ? { backgroundColor: "whiteAlpha.400", cursor: "pointer" } : { backgroundColor: "gray.300", cursor: "pointer" }}
            
            w={"100%"}
            height={"48px"}
            as={Button}
            padding={0}
            paddingLeft={2}
            
          >
            <HStack>
              <Circle size="30px" bg="tomato" color="white">
                S
              </Circle>
              <Text color={colorMode == "light" ?  "#4a5568" : ""} fontSize={"14px"}>Shaktiraj</Text>
            </HStack>
          </MenuButton>
          <MenuList fontSize={"14px"} minWidth={"143%"}>
            <MenuItem>Customize OpenGPT</MenuItem>
            <MenuItem onClick={onOpen}>Settings</MenuItem>
            <Divider />
            <MenuItem>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
    </>
  );
};

export default Sidebar;

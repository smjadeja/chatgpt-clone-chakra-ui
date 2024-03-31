import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Divider,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  HStack,
  List,
  Text,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  useColorMode,

} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { TbDatabaseCog } from "react-icons/tb";

interface Props {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

const SettingModal = ({ isOpen,  onClose }: Props) => {
    const { colorMode, setColorMode} = useColorMode()
    
  
  const [selectedMenu, setSelectedMenu] = useState("general")

  const dataMenu = () => 
    <>
  <ListItem
    w={"100%"}
    display={"flex"}
    alignItems={"start"}
    justifyContent={"space-between"}
    flexDir={"column"}
  >
    <HStack marginBottom={4} width={"100%"} display={"flex"} justifyContent={"space-between"}>
        <Text>Chat History & training</Text>  <Switch /> </HStack>
        <Text fontSize={"12px"}>
        Save new chats on this browser to your history and allow them to be used to improve our models. Unsaved chats will be deleted from our systems within 30 days. This setting does not sync across browsers or devices. Learn more
        </Text>
  
   
  </ListItem>
  <Divider />
  <ListItem
    w={"100%"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Text>
    Shared Links
        </Text> 
        <Button size={"sm"}>
            Manage
        </Button>
  </ListItem>
  <Divider />

  <ListItem
    w={"100%"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Text>Export data</Text>

    <Button size={"sm"}>
            Export
        </Button>
  </ListItem>
  <Divider />
  <ListItem
    w={"100%"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Text>Delete account</Text>
    <Button colorScheme="red" size={"sm"}>
            Delete
        </Button>
  </ListItem>
  
    </>
  

  const generalMenu = () => 
    <>
    <ListItem
    w={"100%"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Text>Theme</Text>
    <Menu>
      <MenuButton
        as={Button}
        size={"sm"}
        rightIcon={<ChevronDownIcon />}
      >
        {colorMode[0].toUpperCase() + colorMode.slice(1,) || "Select"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setColorMode("dark")}>
          Dark
        </MenuItem>
        <MenuItem onClick={() => setColorMode("light")}>
          Light
        </MenuItem>
      </MenuList> 
    </Menu>
  </ListItem>
  <Divider />
  <ListItem
    w={"100%"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Text>Always show code when using data analyst</Text>
    <Switch />
  </ListItem>
  <Divider />
  <ListItem
    w={"100%"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Text>
    Archived chats
        </Text> 
        <Button size={"sm"}>
            Manage
        </Button>
  </ListItem>
  <Divider />

  <ListItem
    w={"100%"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Text>Archive all chats</Text>

    <Button size={"sm"}>
            Archive All
        </Button>
  </ListItem>
  <Divider />
  <ListItem
    w={"100%"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Text>Delete all chats</Text>
    <Button colorScheme="red" size={"sm"}>
            Delete
        </Button>
  </ListItem>
  
    </>
  
  return (
    <>
      <Modal size={"xl"}  isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody  padding={4} minHeight={"320px"}>
            <HStack spacing={5} alignItems={"start"}>
              <VStack width={"30%"} height={"100%"} alignItems={"start"}>
                <List width={"100%"} spacing={1}>
                  <ListItem  bg={selectedMenu == "general" ?  colorMode == "dark" ?  "gray.600" : "gray.200" :"" }   padding={2} borderRadius={5}  onClick={() => setSelectedMenu("general")}>
                    <HStack alignItems={"center"}>
                      <MdOutlineSettings />
                      <Text>General</Text>
                      
                    </HStack>
                  </ListItem>
                  <ListItem padding={2} borderRadius={5} bg={selectedMenu == "data" ?  colorMode == "dark" ?  "gray.600" : "gray.200" :"" }   onClick={() => setSelectedMenu("data")}>
                    <HStack alignItems={"center"}>
                      <TbDatabaseCog />
                      <Text>Data</Text>
                    </HStack>
                  </ListItem>
                </List>
              </VStack>
              <VStack width={"70%"}>

                <List width={"100%"} spacing={3}>

                 {selectedMenu ==="data" ? dataMenu() : generalMenu()}
                 
                  
                </List>
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingModal;

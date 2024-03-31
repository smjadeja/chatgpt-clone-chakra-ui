import React, {
  ChangeEvent, useEffect,
  useRef,
  useState
} from "react";
import {
  Box,
  Input,
  FormControl,
  HStack,
  VStack,
  Text, useColorMode, Button
} from "@chakra-ui/react";
import queryGPT from "../hooks/useQuery";
import { getUuid } from "../services/uuid-service";
import useConversationStore from "../state-management/ConversationStore/store";
import { BsFiletypePdf } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";

export const FooterInput = () => {
  const { colorMode } = useColorMode();
  const {
    selectedConversation, addMessageToConversation, createNewConversation,
  } = useConversationStore();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  const [inputValue, setInputValue] = useState("");
  const [inputFile, setInputFile] = useState<any>(null);
  const handleFileSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    let file = null;
    if (event.target.files !== null) {
      file = event.target.files[0];
      console.log('File Name:', file.name);
      console.log('File Size:', file.size);
      console.log('File Type:', file.type);
      setInputFile(file);
    }
  };
  const queryGpt = queryGPT({
    selectedConversation,
    updateData: addMessageToConversation,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const tempValue = inputValue;
    const data = { question: tempValue };

    if (selectedConversation !== null) {
      setInputValue("");
      addMessageToConversation(selectedConversation.id, {
        text: tempValue,
        userType: "You",
      });
      queryGpt.mutate(data);
    } else {
      const uuid = getUuid();
      createNewConversation(uuid, inputValue, {
        text: inputValue,
        userType: "You",
      });
      queryGpt.mutate(data);
    }
    setInputValue("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleTabClic = (value: string) => {
    const uuid = getUuid();
    createNewConversation(uuid, value, {
      text: value,
      userType: "You",
    });
    queryGpt.mutate({ question: value });
    setInputValue("");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      // height="60px"
      flexDir={"column"}
      width="100%"
    >
      {selectedConversation === null && (
        <Box marginBottom={5} width={{ base: "90%", lg: "60%" }}>
          <HStack justifyContent={"center"} display={"flex"}>
            <VStack fontSize={"14px"} width={"50%"}>
              <Box
                bg={colorMode == "dark" ? "gray.700" : "gray.100"}
                onClick={() => handleTabClic("Best mileage cars Under 50 lac rupess")}
                border={"1px"}
                width={"100%"}
                textAlign={"start"}
                padding={3}
                borderRadius={5}
                borderColor={colorMode == "dark" ? "gray.600" : "gray.300"}
                borderWidth={"2px"}
                color={colorMode == "light" ? "gray.700" : ""}
                _hover={colorMode == "dark"
                  ? { backgroundColor: "gray.600", cursor: "pointer" }
                  : { backgroundColor: "gray.300", cursor: "pointer" }}
              >
                <Text
                  opacity={"0.9"}
                  color={colorMode == "dark" ? "gray.100" : "gray.600"}
                  fontWeight={"bold"}
                  size={"sm"}
                >
                  Best mileage cars
                </Text>
                <Text opacity={"0.5"} as="span">
                  Under 50 lac rupess
                </Text>
              </Box>
              <Box
                onClick={() => handleTabClic(
                  "Most Expensive cars in terms of luxury and comfort"
                )}
                border={"1px"}
                bg={colorMode == "dark" ? "gray.700" : "gray.100"}
                width={"100%"}
                textAlign={"start"}
                padding={3}
                borderRadius={5}
                borderColor={colorMode == "dark" ? "gray.600" : "gray.300"}
                borderWidth={"2px"}
                _hover={colorMode == "dark"
                  ? { backgroundColor: "gray.600", cursor: "pointer" }
                  : { backgroundColor: "gray.300", cursor: "pointer" }}
              >
                <Text
                  opacity={"0.9"}
                  color={colorMode == "dark" ? "gray.100" : "gray.600"}
                  fontWeight={"bold"}
                  size={"xs"}
                >
                  Most Expensive cars
                </Text>
                <Text opacity={"0.5"} as="span">
                  in terms of luxury and comfort
                </Text>
              </Box>
            </VStack>
            <VStack fontSize={"14px"} width={"50%"}>
              <Box
                bg={colorMode == "dark" ? "gray.700" : "gray.100"}
                onClick={() => handleTabClic("Safest cars in india With best mileage")}
                border={"1px"}
                width={"100%"}
                textAlign={"start"}
                padding={3}
                borderRadius={5}
                borderColor={colorMode == "dark" ? "gray.600" : "gray.300"}
                borderWidth={"2px"}
                _hover={colorMode == "dark"
                  ? { backgroundColor: "gray.600", cursor: "pointer" }
                  : { backgroundColor: "gray.300", cursor: "pointer" }}
              >
                <Text
                  opacity={"0.9"}
                  color={colorMode == "dark" ? "gray.100" : "gray.600"}
                  fontWeight={"bold"}
                  size={"sm"}
                >
                  Safest cars in india
                </Text>
                <Text opacity={"0.5"} as="span">
                  With best mileage
                </Text>
              </Box>
              <Box
                bg={colorMode == "dark" ? "gray.700" : "gray.100"}
                onClick={() => handleTabClic("Best car budget cars Under 15 lac rupess")}
                border={"1px"}
                width={"100%"}
                textAlign={"start"}
                padding={3}
                borderRadius={5}
                borderColor={colorMode == "dark" ? "gray.600" : "gray.300"}
                borderWidth={"2px"}
                _hover={colorMode == "dark"
                  ? { backgroundColor: "gray.600", cursor: "pointer" }
                  : { backgroundColor: "gray.300", cursor: "pointer" }}
              >
                <Text
                  opacity={"0.9"}
                  color={colorMode == "dark" ? "gray.100" : "gray.600"}
                  fontWeight={"bold"}
                  size={"sm"}
                >
                  Best car budget cars
                </Text>
                <Text opacity={"0.5"} as="span">
                  Under 15 lac rupess
                </Text>
              </Box>
            </VStack>
          </HStack>
        </Box>
      )}

      <form
        style={{ width: "100%", marginBottom: "5px" }}
        onSubmit={(event) => handleSubmit(event)}
      >
        <FormControl display={"flex"} justifyContent={"center"} paddingTop={2}>
          <VStack width={{ base: "90%", lg: "60%" }}>
            {inputFile &&
              <Box width={"100%"}>
                <Box
                  padding={3}
                  display={"flex"}
                  position={"relative"}
                  justifyContent={"space-between"}
                  flexDir={"column"}
                  background={"gray.700"}
                  borderRadius={"8px"}
                  height={"140px"}
                  width={"140px"}
                >
                  <Button
                    bg={""}
                    _hover={{ background: "" }}
                    _active={{ background: "" }}
                    padding={0}
                    position={"absolute"}
                    top={"1px"}
                    right={0}
                  >
                    <IoCloseCircleSharp size={20} color="gray.600" />
                  </Button>

                  <BsFiletypePdf size={40} />
                  <VStack alignItems={"start"}>
                    <Text fontWeight={"bold"} fontSize={"12px"} marginBottom={0} as={"span"}>
                      {inputFile.name.slice(0, 18)}
                    </Text>
                    <Text opacity={0.8} fontSize={"12px"} marginBottom={0} as={"span"}>
                      formatFileSize
                    </Text>
                  </VStack>
                </Box>
              </Box>}

            <HStack width={"100%"}>
              <Input type="file" width={"10%"} onChange={handleFileSubmit} />

              <Input
                ref={inputRef}
                paddingRight={2}
                bg={colorMode == "dark" ? "gray.700" : "gray.200"}
                width={"100%"}
                placeholder="Message open gpt..."
                value={inputValue}
                onChange={(event) => handleChange(event)} />
            </HStack>
          </VStack>
        </FormControl>
      </form>
      <Text fontSize={"12px"} opacity={"0.5"}>
        OpenGPT can make mistakes. Consider checking important information.
      </Text>
    </Box>
  );
};

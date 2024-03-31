import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Box,
  Input,
  FormControl,
  HStack,
  VStack,
  Text,
  useColorMode,
  Image,
  Button,
} from "@chakra-ui/react";
import { queryGPT, queryImage } from "../hooks/useQuery";
import { getUuid } from "../services/uuid-service";
import useConversationStore from "../state-management/ConversationStore/store";
import { BsFiletypePdf } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";
import { formatFileSize, getLastElementUppercase } from "../services/utils";
import { GrAttachment } from "react-icons/gr";
import { IMAGE_TYPES, FILE_TYPES } from ".//../shared/constants";
import { fileToBase64 } from "../services/utils";

const FooterInput = () => {
  const { colorMode } = useColorMode();
  const {
    selectedConversation,
    addMessageToConversation,
    createNewConversation,
  } = useConversationStore();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [inputFile, setInputFile] = useState<any>(null);
  const [base64String, setBase64String] = useState("");
  const handleFileSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("setting the file");
    let file = null;
    if (event.target.files !== null) {
      file = event.target.files[0];
      console.log("File Name:", file.name);
      console.log("File Size:", file.size);
      console.log("File Type:", file.type);
      // setInputFile(event.target.value);
      console.log("beforesetting", file);
      console.log(event.target.value);
      console.log(event.target.value);

      setInputFile(file);
    }
  };
  const queryGpt = queryGPT({
    selectedConversation,
    updateData: addMessageToConversation,
  });

  const queryImg = queryImage({
    selectedConversation,
    updateData: addMessageToConversation,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const tempValue = inputValue;
    if (tempValue.trim() !== "" || inputFile !== null) {
      const data = { query: tempValue };

      if (selectedConversation !== null) {
        setInputValue("");
        setInputFile(null);
        addMessageToConversation(selectedConversation.id, {
          text: tempValue,
          userType: "You",
          file: inputFile || "",
          fileUrl: inputFile ? URL.createObjectURL(inputFile) : "",
        });

        if (inputFile) {
          fileToBase64(inputFile).then((value) => {
            queryImg.mutate({ img: value });
          });
        }
        queryGpt.mutate(data);
      } else {
        const uuid = getUuid();
        createNewConversation(uuid, inputValue, {
          text: inputValue,
          userType: "You",
          file: inputFile || "",
          fileUrl: inputFile ? URL.createObjectURL(inputFile) : "",
        });
        if (inputFile) {
          fileToBase64(inputFile).then((value) => {
            queryImg.mutate({ img: value });
          });
        }
        queryGpt.mutate(data);
      }
      setInputValue("");
      setInputFile(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleTabClic = (value: string) => {
    const uuid = getUuid();
    createNewConversation(uuid, value, {
      text: value,
      userType: "You",
      fileUrl: "",
    });
    queryGpt.mutate({ query: value });
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
        <Box marginBottom={1} width={{ base: "90%", lg: "55%" }}>
          <HStack paddingLeft={"7%"} justifyContent={"center"} display={"flex"}>
            <VStack fontSize={"14px"} width={"50%"}>
              <Box
                bg={colorMode == "dark" ? "gray.700" : "gray.100"}
                onClick={() =>
                  handleTabClic("Best mileage cars Under 50 lac rupess")
                }
                border={"1px"}
                width={"100%"}
                textAlign={"start"}
                padding={3}
                borderRadius={5}
                borderColor={colorMode == "dark" ? "gray.600" : "gray.300"}
                borderWidth={"2px"}
                color={colorMode == "light" ? "gray.700" : ""}
                _hover={
                  colorMode == "dark"
                    ? { backgroundColor: "gray.600", cursor: "pointer" }
                    : { backgroundColor: "gray.300", cursor: "pointer" }
                }
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
                onClick={() =>
                  handleTabClic(
                    "Most Expensive cars in terms of luxury and comfort"
                  )
                }
                border={"1px"}
                bg={colorMode == "dark" ? "gray.700" : "gray.100"}
                width={"100%"}
                textAlign={"start"}
                padding={3}
                borderRadius={5}
                borderColor={colorMode == "dark" ? "gray.600" : "gray.300"}
                borderWidth={"2px"}
                _hover={
                  colorMode == "dark"
                    ? { backgroundColor: "gray.600", cursor: "pointer" }
                    : { backgroundColor: "gray.300", cursor: "pointer" }
                }
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
                onClick={() =>
                  handleTabClic("Safest cars in india With best mileage")
                }
                border={"1px"}
                width={"100%"}
                textAlign={"start"}
                padding={3}
                borderRadius={5}
                borderColor={colorMode == "dark" ? "gray.600" : "gray.300"}
                borderWidth={"2px"}
                _hover={
                  colorMode == "dark"
                    ? { backgroundColor: "gray.600", cursor: "pointer" }
                    : { backgroundColor: "gray.300", cursor: "pointer" }
                }
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
                onClick={() =>
                  handleTabClic("Best car budget cars Under 15 lac rupess")
                }
                border={"1px"}
                width={"100%"}
                textAlign={"start"}
                padding={3}
                borderRadius={5}
                borderColor={colorMode == "dark" ? "gray.600" : "gray.300"}
                borderWidth={"2px"}
                _hover={
                  colorMode == "dark"
                    ? { backgroundColor: "gray.600", cursor: "pointer" }
                    : { backgroundColor: "gray.300", cursor: "pointer" }
                }
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
          <VStack width={{ base: "90%", lg: "55%" }}>
            {inputFile && (
              <Box width={"100%"} paddingLeft={"7%"}>
                <Box
                  padding={2}
                  display={"flex"}
                  position={"relative"}
                  justifyContent={"space-between"}
                  flexDir={"column"}
                  background={"gray.700"}
                  borderRadius={"6px"}
                  height={"140px"}
                  width={"140px"}
                >
                  <Button
                    bg={""}
                    _hover={{ background: "" }}
                    _active={{ background: "" }}
                    padding={0}
                    position={"absolute"}
                    top={"-6px"}
                    right={"-6px"}
                    onClick={() => {
                      setInputFile(null);
                      if (inputFileRef.current !== null) {
                        inputFileRef.current.value = "";
                      }
                    }}
                  >
                    <IoCloseCircleSharp size={20} color="gray.900" />
                  </Button>

                  <Box
                    height={"100%"}
                    display={"flex"}
                    justifyContent={"start"}
                    alignItems={"start"}
                  >
                    {IMAGE_TYPES.includes(inputFile.type) && (
                      <Image
                        borderRadius={4}
                        objectFit={"cover"}
                        w={"100%"}
                        h={"80px"}
                        bg={"white"}
                        padding={0}
                        src={URL.createObjectURL(inputFile)}
                      />
                    )}

                    {FILE_TYPES.includes(inputFile.type) && (
                      <Box paddingTop={1} paddingLeft={1}>
                        <BsFiletypePdf size={60} />
                      </Box>
                    )}
                  </Box>

                  <VStack alignItems={"start"} spacing={0}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"12px"}
                      marginBottom={0}
                      as={"span"}
                    >
                      {inputFile.name.slice(0, 14)}
                    </Text>
                    <Text
                      opacity={0.8}
                      fontSize={"12px"}
                      marginBottom={0}
                      as={"span"}
                    >
                      {formatFileSize(inputFile.size)} |{" "}
                      {getLastElementUppercase(inputFile.type)}
                    </Text>
                  </VStack>
                </Box>
              </Box>
            )}

            <HStack width={"100%"}>
              <Box
                _hover={{
                  background: colorMode == "dark" ? "gray.600" : "gray.300",
                }}
                background={colorMode == "dark" ? "gray.700" : "gray.200"}
                borderRadius={"6px"}
                position={"relative"}
                width={"6%"}
                height={"100%"}
              >
                <Input
                  width={"100%"}
                  type="file"
                  variant="filled"
                  bg="gray.100"
                  color="gray.800"
                  _hover={{ bg: "gray.200" }}
                  _focus={{ bg: "gray.200", borderColor: "blue.400" }}
                  _placeholder={{ color: "gray.500" }} // Change placeholder color
                  _empty={{ opacity: 0 }}
                  onChange={handleFileSubmit}
                  // onClick={handleAttachmentClick}
                  cursor="pointer"
                  /// <reference path="er" />
                  ref={inputFileRef}
                  position="absolute"
                  zIndex="2" // Ensure the icon is above the input// Hide the default "Choose File" text when input is empty
                />
                <Box position={"absolute"} top={3} left={3}>
                  <GrAttachment size={"16px"} />
                </Box>
              </Box>

              {/* <Input type="file" placeholder="" width={"10%"} onChange={handleFileSubmit} /> */}

              <Input
                ref={inputRef}
                paddingRight={2}
                bg={colorMode == "dark" ? "gray.700" : "gray.200"}
                width={"94%"}
                placeholder="Message open gpt..."
                value={inputValue}
                onChange={(event) => handleChange(event)}
              />
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

export default FooterInput;

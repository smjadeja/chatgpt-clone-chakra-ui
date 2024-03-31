import {
  Box,
  Text,
  Circle,
  HStack,
  VStack,
  useColorMode,
  Image,
  Button,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import useConversationStore from "../state-management/ConversationStore/store";
import { TbFidgetSpinner } from "react-icons/tb";
import { FILE_TYPES, IMAGE_TYPES } from "../shared/constants";
import { BsFiletypePdf } from "react-icons/bs";
import { formatFileSize, getLastElementUppercase } from "../services/utils";
import TextToSpeech from "./TextToSpeechV1";

const Conversation = () => {
  const { colorMode } = useColorMode();
  const { selectedConversation } = useConversationStore();
  const boxRef = useRef<HTMLDivElement>(null);
  const LIscrollToBottom = () => {
    if (boxRef.current) {
      console.log("height", boxRef.current.scrollHeight);
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  };
  // const scrollBotom = () =>
  useEffect(() => {
    LIscrollToBottom();
  }, [selectedConversation]);
  const handleDownload = (imageUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Box
      flex={1}
      ref={boxRef}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      overflowY={"auto"}
      paddingLeft={"6px"}
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
      <Box width={"55%"}>
        {!selectedConversation && (
          <Box
            height={"100%"}
            w={"100%"}
            justifyContent={"center"}
            display={"flex"}
            alignItems={"center"}
          >
            <VStack>
              <TbFidgetSpinner
                color={colorMode == "light" ? "4a5568" : ""}
                size={"44px"}
              />

              <Box color={colorMode == "light" ? "#4a5568" : ""}>
                How can I help you today?
              </Box>
            </VStack>
          </Box>
        )}
        {selectedConversation?.MessageList.map((item, index) => (
          <Box
            marginBottom={"36px"}
            key={index}

            // width={{ base: "90%", lg: "60%" }}
          >
            <HStack marginBottom={2} display={"flex"} flexDir={"row"}>
              <Circle
                float={"left"}
                fontSize={"12px"}
                display={"flex"}
                alignItems={"center"}
                alignContent={"center"}
                size="20px"
                bg={item.userType === "You" ? "tomato" : "green"}
                color="white"
              >
                {item.userType === "You" ? "S" : "A"}
              </Circle>

              <Text float={"left"}>{item.userType}</Text>
              {item.userType === "OpenGPT" && (
                <Box display={"flex"} float={"right"} marginLeft={"auto"}>
                  <TextToSpeech text={item.text} />
                </Box>
              )}
            </HStack>

            {item.file && item.fileUrl && (
              <HStack
                onClick={() => {
                  if (item.fileUrl && item.file)
                    handleDownload(item.fileUrl, item.file.name);
                }}
                marginBottom={3}
              >
                <Box
                  padding={2}
                  display={"flex"}
                  position={"relative"}
                  justifyContent={"space-between"}
                  flexDir={"column"}
                  background={colorMode == "light" ? "gray.200" : ""}
                  borderRadius={"8px"}
                  height={"140px"}
                  width={"140px"}
                >
                  <Box
                    height={"100%"}
                    display={"flex"}
                    justifyContent={"start"}
                    alignItems={"start"}
                  >
                    {item?.file &&
                      item.fileUrl &&
                      IMAGE_TYPES.includes(item.file.type) && (
                        <Image
                          borderRadius={4}
                          objectFit={"cover"}
                          w={"100%"}
                          h={"80px"}
                          bg={"white"}
                          padding={0}
                          src={URL.createObjectURL(item.file)}
                        />
                      )}

                    {FILE_TYPES.includes(item.file.type) && (
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
                      {item.file.name.slice(0, 14)}
                    </Text>
                    <Text
                      opacity={0.8}
                      fontSize={"12px"}
                      marginBottom={0}
                      as={"span"}
                    >
                      {formatFileSize(item.file.size)} |{" "}
                      {getLastElementUppercase(item.file.type)}
                    </Text>
                  </VStack>
                </Box>
              </HStack>
            )}
            <Text>{item.text}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Conversation;

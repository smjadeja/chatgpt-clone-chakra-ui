import APIClient from "../services/api-client";
import { GPTQuery, ImageQuery } from "../entities/GPTQuery";
import { useMutation } from "@tanstack/react-query";
import { ConversationItem, Message, answerItem } from "../entities/ConversationItem";
const apiclient = new APIClient<answerItem>();

interface Props {
  selectedConversation : ConversationItem | null
  updateData :(id: string, message: Message) => void
}

export const queryGPT = ({selectedConversation, updateData} : Props ) =>
  useMutation<answerItem,unknown,GPTQuery>({
    mutationFn: (query: GPTQuery ) => apiclient.getQueryResponse(query),
    onSuccess : (answer) => {  
      if  (selectedConversation){        
        updateData(selectedConversation.id, {"text":answer.text,"userType" :"OpenGPT"})

      }
  }
  });


export const queryImage = ({selectedConversation, updateData} : Props) => 
  useMutation<answerItem,unknown,ImageQuery>({
    mutationFn: (query: ImageQuery ) => apiclient.getImageResponse(query),
    onSuccess : (answer) => {  
      if  (selectedConversation){       
        console.log(answer) 
        updateData(selectedConversation.id, {"text":answer.text,"userType" :"OpenGPT"})

      }
  }
  });





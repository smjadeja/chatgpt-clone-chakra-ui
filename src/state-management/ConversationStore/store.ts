import {
  ConversationItem,
  Message,
} from "../../entities/ConversationItem";
import { create } from "zustand";
import {mountStoreDevtool} from 'simple-zustand-devtools'

interface ConversationStore {
  selectedConversationId: string;
  selectedConversation: ConversationItem | null;
  conversationList: ConversationItem[];
  selectConversation: (conversationID: string) => void;
  createNewConversation: (id: string,title: string, message : Message) => void;
  addMessageToConversation: (id: string, message: Message) => void; // Add 'message' parameter
  resetConversation ():  void;
  removeConversation (id : string) : void
}

const useConversationStore = create<ConversationStore>((set, get) => ({
  resetConversation :() => set({
    selectedConversation :null,
    selectedConversationId:""
  })  ,
  selectedConversationId: "",
  selectedConversation: null,
  conversationList: [],
  selectConversation: (conversationID: string) =>
    set((store) => ({
      selectedConversationId: conversationID,
      selectedConversation:
        store.conversationList.find(
          (conversation) => conversation.id === conversationID
        ) || null,
    })),
  createNewConversation: (id: string, title: string,message  : Message) => {
    set((store) => (
      
      {      
      conversationList: [
        ...store.conversationList,
        { id: id, title: title, MessageList: [message] },
      ],
    })),
    get().selectConversation(id)

  },
  removeConversation: (id) => {
    set((store) => ({
      conversationList: store.conversationList.filter(conversation => conversation.id !== id)
    }));
  },
  addMessageToConversation: (id: string, message: Message) =>
  set((store) => {
    const updatedConversationList = store.conversationList.map((conversation) => {
      if (conversation.id === id) {
        return {
          ...conversation,
          MessageList: [...conversation.MessageList, message],
        };
      }
      return conversation;
    });

    // Update selectedConversation if it matches the updated conversation
    const updatedSelectedConversation = store.selectedConversationId === id
      ? updatedConversationList.find(conversation => conversation.id === id) || null
      : store.selectedConversation;

    return {
      conversationList: updatedConversationList,
      selectedConversation: updatedSelectedConversation,
    };
  }),
}));

if (process.env.NODE_ENV === "development")
 mountStoreDevtool('Conversation Store', useConversationStore)

export default useConversationStore;

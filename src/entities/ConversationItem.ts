export interface answerItem {
    text : string    
    file ? : File | string
    userType : "You" | "OpenGPT"
}
export interface Message {
    text : string    
    file ? : File | null
    fileUrl? : string | ""
    userType : "You" | "OpenGPT"
}

export interface  ConversationItem {
    id : string ,
    title : string,
    MessageList : Message[]
}

export interface ConversationList {
    conversationList : ConversationItem[] 
}

import { ChatMessage, type ChatMessageComponentProps } from "./chat-message"

export interface ChatMessageListProps {
  messages: ChatMessageComponentProps[]
}

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  return (
    <div className="flex flex-col gap-5">
      {messages.map((message, idx) => {
        return <ChatMessage {...message} key={idx} />
      })}
    </div>
  )
}

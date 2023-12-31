import { ChatMessage, type ChatMessageProps } from "./chat-message"

export interface ChatMessageListProps {
  messages: ChatMessageProps[]
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

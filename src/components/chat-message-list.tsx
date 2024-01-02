import { Divider } from "@nextui-org/react"
import React from "react"

import { ChatMessage, type ChatMessageComponentProps } from "./chat-message"

export interface ChatMessageListProps {
  messages: ChatMessageComponentProps[]
}

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      {messages.map((message, idx) => {
        return (
          <React.Fragment key={idx}>
            <ChatMessage {...message} />
            {idx !== messages.length - 1 && <Divider />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

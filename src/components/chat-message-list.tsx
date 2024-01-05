import { Divider } from "@nextui-org/react"
import React, { useEffect, useRef } from "react"

import { ChatMessage, type ChatMessageComponentProps } from "./chat-message"

export interface ChatMessageListProps {
  messages: ChatMessageComponentProps[]
}

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
      <div ref={messagesEndRef} className="h-4" />
    </div>
  )
}

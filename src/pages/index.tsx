import {
  AIMessage,
  HumanMessage,
  SystemMessage
} from "@langchain/core/messages"
import { NextUIProvider, Textarea } from "@nextui-org/react"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { useState } from "react"

import { type ChatMessageProps } from "~components/chat-message"
import { ChatMessageList } from "~components/chat-message-list"

import "~styles/globals.css"

const chatModel = new ChatOpenAI({
  // modelName: "gpt-4-1106-preview",
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.PLASMO_PUBLIC_OPENAI_API_KEY,
  streaming: true
})

export const IndexPage = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>("")

  const onValueChange = (value: string) => {
    setCurrentMessage(value)
  }

  const onSendMessage = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      const updatedMessages = [
        ...messages,
        {
          timestamp: Date.now(),
          body: currentMessage,
          author: "user"
        } as const
      ]
      setMessages(updatedMessages)

      const chatModelMessages = updatedMessages.map((message) => {
        if (message.author === "user") {
          return new HumanMessage(message.body)
        } else if (message.author === "bonsai") {
          return new AIMessage(message.body)
        } else {
          return new SystemMessage(message.body)
        }
      })

      let tempMessage = {
        timestamp: Date.now() + 1,
        body: "",
        author: "bonsai" as const
      }
      let isStreaming = false

      chatModel.call(chatModelMessages, {
        callbacks: [
          {
            handleLLMNewToken(token: string) {
              tempMessage.body += token
              if (!isStreaming) {
                isStreaming = true
                setMessages([...updatedMessages, tempMessage])
              } else {
                setMessages((prevMessages) =>
                  prevMessages.map((message) =>
                    message.timestamp === tempMessage.timestamp
                      ? tempMessage
                      : message
                  )
                )
              }
            }
          }
        ]
      })

      setCurrentMessage("")
    }
  }

  return (
    <NextUIProvider className="flex flex-col h-full w-full">
      <main className="dark text-foreground bg-background flex justify-center h-full px-8 py-4">
        <div className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 mb-32">
          <ChatMessageList messages={messages} />
        </div>
        <div className="flex justify-center items-center fixed bottom-0 w-full bg-background px-8 py-4 z-10 h-32">
          <Textarea
            variant={"bordered"}
            label="Write something"
            value={currentMessage}
            onValueChange={onValueChange}
            onKeyDown={onSendMessage}
            className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2"
          />
        </div>
      </main>
    </NextUIProvider>
  )
}

export default IndexPage

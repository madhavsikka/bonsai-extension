import {
  AIMessage,
  HumanMessage,
  SystemMessage
} from "@langchain/core/messages"
import { Image, NextUIProvider, Textarea } from "@nextui-org/react"
import star from "assets/star.svg"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { useState } from "react"

import { type ChatMessageComponentProps } from "~components/chat-message"
import { ChatMessageList } from "~components/chat-message-list"

import "~styles/globals.css"

const chatModel = new ChatOpenAI({
  modelName: "gpt-4-1106-preview",
  // modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.PLASMO_PUBLIC_OPENAI_API_KEY,
  streaming: true
})

export const IndexPage = () => {
  const [messages, setMessages] = useState<ChatMessageComponentProps[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>("")

  const onValueChange = (value: string) => {
    setCurrentMessage(value)
  }

  const onSendMessage = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      const updatedMessageProps: ChatMessageComponentProps[] = [
        ...messages,
        {
          message: {
            timestamp: Date.now(),
            body: currentMessage,
            author: "user"
          } as const,
          isLoading: false
        }
      ]

      const chatModelMessages = updatedMessageProps.map(({ message }) => {
        if (message.author === "user") {
          return new HumanMessage(message.body)
        } else if (message.author === "bonsai") {
          return new AIMessage(message.body)
        } else {
          return new SystemMessage(message.body)
        }
      })

      let tempMessageProps: ChatMessageComponentProps = {
        message: {
          timestamp: Date.now() + 1,
          body: "",
          author: "bonsai" as const
        },
        isLoading: true
      }

      setMessages([...updatedMessageProps, tempMessageProps])

      chatModel.call(chatModelMessages, {
        callbacks: [
          {
            handleLLMNewToken(token: string) {
              tempMessageProps.message.body += token
              tempMessageProps.isLoading = false
              setMessages((prevMessageProps) =>
                prevMessageProps.map((prevMessageProp) =>
                  prevMessageProp.message.timestamp ===
                  tempMessageProps.message.timestamp
                    ? tempMessageProps
                    : prevMessageProp
                )
              )
            }
          }
        ]
      })

      setCurrentMessage("")
    }
  }

  return (
    <NextUIProvider className="flex flex-col h-full w-full font-inter">
      <main className="dark text-foreground bg-background flex justify-center h-full px-8 py-4">
        <div className="fixed top-0 w-full h-16 bg-background px-16 py-4 flex justify-center items-center gap-1">
          <Image src={star} alt="bonsai" width={24} height={24} />
          <p className="text-large font-semibold">bons.ai</p>
          <p className="text-large text-default-400">|</p>
          <p className="text-small text-default-400">The Zenful AI Assistant</p>
        </div>
        <div className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 mt-16 mb-32">
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

import {
  AIMessage,
  HumanMessage,
  SystemMessage
} from "@langchain/core/messages"
import { Textarea } from "@nextui-org/react"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { useState } from "react"

import { type ChatMessageComponentProps } from "~components/chat-message"
import { ChatMessageList } from "~components/chat-message-list"

import { LOCAL_STORAGE_OPENAI_KEY, LOCAL_STORAGE_OPENAI_MODEL } from "./options"

const chatModel = new ChatOpenAI({
  modelName: localStorage.getItem(LOCAL_STORAGE_OPENAI_MODEL),
  openAIApiKey: localStorage.getItem(LOCAL_STORAGE_OPENAI_KEY),
  streaming: true
})

export const NewTabPage = () => {
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
    <>
      <div className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2">
        <ChatMessageList messages={messages} />
      </div>
      <div className="flex justify-center fixed w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 bottom-0 bg-background px-4 z-10 h-32">
        <Textarea
          variant={"bordered"}
          label="Write something"
          value={currentMessage}
          onValueChange={onValueChange}
          onKeyDown={onSendMessage}
          className="w-full"
        />
      </div>
    </>
  )
}

export default NewTabPage
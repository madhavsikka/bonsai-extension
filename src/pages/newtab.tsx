import {
  AIMessage,
  HumanMessage,
  SystemMessage
} from "@langchain/core/messages"
import { Textarea } from "@nextui-org/react"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { useMemo, useState } from "react"

import { type ChatMessageComponentProps } from "~components/chat-message"
import { ChatMessageList } from "~components/chat-message-list"
import { useConfig } from "~hooks/use-config"

export const NewTabPage = () => {
  const { getOpenAIKey, getOpenAIModel } = useConfig()

  if (getOpenAIKey() === "") {
    chrome.runtime.openOptionsPage()
    return <></>
  }

  const [messages, setMessages] = useState<ChatMessageComponentProps[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>("")

  const chatModel = useMemo(
    () =>
      new ChatOpenAI({
        modelName: getOpenAIModel(),
        openAIApiKey: getOpenAIKey(),
        streaming: true
      }),
    []
  )

  const onValueChange = (value: string) => {
    setCurrentMessage(value)
  }

  const onSendMessage = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault()
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
          body: " ",
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
      <div className="flex flex-col w-full sm:w-3/4 2xl:w-2/5">
        <ChatMessageList messages={messages} />
      </div>
      <div className="flex justify-center fixed w-full sm:w-3/4 2xl:w-2/5 bottom-0 bg-background z-10 pb-8">
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

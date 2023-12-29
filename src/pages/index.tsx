import { NextUIProvider, Textarea } from "@nextui-org/react"
import { useState } from "react"

import { type ChatMessageProps } from "~components/chat-message"
import { ChatMessageList } from "~components/chat-message-list"

import "~styles/globals.css"

export const IndexPage = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>("")

  const onValueChange = (value: string) => {
    setCurrentMessage(value)
  }

  const onSendMessage = (event) => {
    if (event.key === "Enter") {
      setMessages([
        ...messages,
        {
          timestamp: new Date().toUTCString(),
          body: currentMessage,
          author: "user"
        }
      ])
      setCurrentMessage("")
    }
  }

  return (
    <NextUIProvider className="flex flex-col h-full w-full">
      <main className="dark text-foreground bg-background p-8 flex justify-center h-full">
        <div className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 gap-4 justify-between">
          <ChatMessageList messages={messages} />
          <Textarea
            variant={"bordered"}
            label="Write something"
            value={currentMessage}
            onValueChange={onValueChange}
            onKeyDown={onSendMessage}
          />
        </div>
      </main>
    </NextUIProvider>
  )
}

export default IndexPage

import { NextUIProvider, Textarea } from "@nextui-org/react"

import { ChatMessage, type ChatMessageProps } from "~components/chat-message"
import { ChatMessageList } from "~components/chat-message-list"

import "~styles/globals.css"

const messages: ChatMessageProps[] = [
  {
    timestamp: "today",
    body: "hello",
    author: "user"
  },
  {
    timestamp: "today",
    body: "Hi, how can I help you?",
    author: "bonsai"
  },
  {
    timestamp: "today",
    body: "hello",
    author: "user"
  },
  {
    timestamp: "today",
    body: "Hi, how can I help you?",
    author: "bonsai"
  }
]

function IndexPage() {
  return (
    <NextUIProvider className="flex flex-col h-full w-full">
      <main className="dark text-foreground bg-background p-8 flex justify-center h-full">
        <div className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 gap-4">
          <ChatMessageList messages={messages} />
          <Textarea variant={"bordered"} label="Write something" />
        </div>
      </main>
    </NextUIProvider>
  )
}

export default IndexPage

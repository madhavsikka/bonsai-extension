import { Avatar, Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react"
import star from "assets/star.svg"

import ChatMarkdown from "./chat-markdown"

export interface ChatMessageProps {
  author: "user" | "bonsai"
  body: string
  timestamp: number
}
export interface ChatMessageComponentProps {
  message: ChatMessageProps
  isLoading?: boolean
}

const getAuthorDisplayName = (author: ChatMessageProps["author"]) => {
  switch (author) {
    case "user":
      return "You"
    case "bonsai":
      return "Bonsai"
  }
}

let timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
} as const

let dateOptions = {
  month: "short",
  day: "numeric"
} as const

export const ChatMessage = ({
  message,
  isLoading = false
}: ChatMessageComponentProps) => {
  const { author, body, timestamp } = message
  return (
    <Card className="w-full p-2">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered={false}
            radius="sm"
            size="sm"
            showFallback
            imgProps={{ className: "w-24 h-24" }}
            // @ts-ignore
            src={author === "bonsai" ? star : ""}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {getAuthorDisplayName(author)}
            </h4>
          </div>
        </div>
        <p className="text-default-400 text-small">
          {`${new Date(timestamp).toLocaleString(
            "en-US",
            timeOptions
          )}, ${new Date(timestamp).toLocaleString("en-US", dateOptions)}`}
        </p>
      </CardHeader>
      <Skeleton className="rounded-lg" isLoaded={!isLoading}>
        <CardBody className="px-3 py-3 text-medium text-default-600">
          <ChatMarkdown>{body}</ChatMarkdown>
        </CardBody>
      </Skeleton>
    </Card>
  )
}

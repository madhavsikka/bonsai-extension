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
    <Card className="w-full py-2 bg-background">
      <div className="flex grow gap-5">
        <Avatar
          isBordered={false}
          radius="sm"
          size="sm"
          showFallback
          imgProps={{ className: "w-24 h-24" }}
          // @ts-ignore
          src={author === "bonsai" ? star : ""}
          className="flex-shrink-0"
        />
        <div className="flex flex-col gap-y-2 flex-grow">
          <h4 className="text-small font-semibold">
            {getAuthorDisplayName(author)}
          </h4>
          <Skeleton className="rounded-md" isLoaded={!isLoading}>
            <CardBody className="text-medium m-0 p-0 min-h-6">
              <ChatMarkdown>{body}</ChatMarkdown>
            </CardBody>
          </Skeleton>
        </div>
      </div>
      {/* <p className="text-default-400 text-small">
        {`${new Date(timestamp).toLocaleString(
          "en-US",
          timeOptions
        )}, ${new Date(timestamp).toLocaleString("en-US", dateOptions)}`}
      </p> */}
    </Card>
  )
}

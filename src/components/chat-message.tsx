import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from "@nextui-org/react"

export interface ChatMessageProps {
  author: "user" | "bonsai"
  body: string
  timestamp: string
}

const getAuthorDisplayName = (author: ChatMessageProps["author"]) => {
  switch (author) {
    case "user":
      return "You"
    case "bonsai":
      return "Bonsai"
  }
}

export const ChatMessage = ({ body, timestamp, author }: ChatMessageProps) => {
  return (
    <Card className={`w-full`}>
      <CardHeader className="justify-between">
        <div className={`flex gap-5`}>
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {getAuthorDisplayName(author)}
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{body}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <p className="text-default-400 text-small">
          {new Date(timestamp).toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  )
}

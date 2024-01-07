import { useMemo, type ReactNode } from "react"
import reactNodeToString from "react-node-to-string"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism"

import ReactMarkdown from "~libs/react-markdown.min.js"

function CustomCode(props: { children: ReactNode; className?: string }) {
  const code = useMemo(
    () => reactNodeToString(props.children),
    [props.children]
  )

  const match = /language-(\w+)/.exec(props.className || "")

  return (
    <div className="flex flex-col">
      <SyntaxHighlighter
        PreTag="div"
        children={String(code).replace(/\n$/, "")}
        language={match?.[1] ?? ""}
        style={coldarkDark}
        customStyle={{
          borderRadius: "0.5rem"
        }}
      />
    </div>
  )
}

export const ChatMarkdown = ({ children }) => {
  return (
    <ReactMarkdown
      className={`markdown-custom-styles`}
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
          return <CustomCode className={className}>{children}</CustomCode>
        }
      }}>
      {children}
    </ReactMarkdown>
  )
}

export default ChatMarkdown

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism"

import ReactMarkdown from "~libs/react-markdown.min.js"

export const ChatMarkdown = ({ children }) => {
  return (
    <ReactMarkdown
      className={`markdown-custom-styles`}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props
          const match = /language-(\w+)/.exec(className || "")
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={coldarkDark}
              customStyle={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                overflow: "auto"
              }}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          )
        }
      }}>
      {children}
    </ReactMarkdown>
  )
}

export default ChatMarkdown

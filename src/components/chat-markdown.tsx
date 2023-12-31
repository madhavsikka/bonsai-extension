import ReactMarkdown from "~libs/react-markdown.min.js"

export const ChatMarkdown = ({ children }) => {
  return (
    <ReactMarkdown className={`markdown-custom-styles`}>
      {children}
    </ReactMarkdown>
  )
}

export default ChatMarkdown

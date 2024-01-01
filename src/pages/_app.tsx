import { Image, NextUIProvider } from "@nextui-org/react"
import star from "assets/star.svg"

import "~styles/globals.css"

export const BonsaiApp = ({ children }) => {
  return (
    <NextUIProvider className="flex flex-col h-full w-full font-inter">
      <main className="dark text-foreground bg-background flex flex-col justify-center h-full px-8 py-4">
        <div className="fixed top-0 w-full h-16 bg-background px-16 py-4 flex justify-center items-center gap-1">
          <Image src={star} alt="bonsai" width={24} height={24} />
          <p className="text-large font-semibold">bons.ai</p>
          <p className="text-large text-default-400">|</p>
          <p className="text-small text-default-400">The Zenful AI Assistant</p>
        </div>
        <div className="flex justify-center w-full h-full mt-16 mb-32">
          {children}
        </div>
      </main>
    </NextUIProvider>
  )
}

export default BonsaiApp

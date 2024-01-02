import { Button, Image, NextUIProvider, Tooltip } from "@nextui-org/react"
import star from "assets/star.svg"
import { SiBuymeacoffee } from "react-icons/si"

import "~styles/globals.css"

export const BonsaiApp = ({ children }) => {
  return (
    <NextUIProvider className="flex flex-col h-full w-full font-inter">
      <main className="dark text-foreground bg-background flex flex-col justify-center h-full py-4">
        <div className="fixed top-0 w-full h-16 bg-background px-0 py-4 flex justify-center items-center gap-1">
          <Image src={star} alt="bonsai" width={24} height={24} />
          <p className="text-large font-semibold">bons.ai</p>
          <p className="text-large text-default-400">|</p>
          <p className="text-small text-default-400">The Zenful AI Assistant</p>
        </div>
        <div className="flex justify-center w-full h-full mt-16 mb-32">
          {children}
        </div>
        <div className="fixed bottom-0 right-0 mb-6 mr-4">
          <Tooltip
            content="Buy me a coffee"
            placement="left"
            showArrow
            color="foreground">
            <Button className="bg-background text-foreground p-2 m-0 min-w-0">
              <a
                href="https://www.buymeacoffee.com/madhavsikka"
                target="_blank">
                <SiBuymeacoffee size={36} />
              </a>
            </Button>
          </Tooltip>
        </div>
      </main>
    </NextUIProvider>
  )
}

export default BonsaiApp

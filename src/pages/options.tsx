import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem
} from "@nextui-org/react"
import React, { useCallback, useEffect, useState } from "react"
import { RiOpenaiFill } from "react-icons/ri"

import { useConfig } from "~hooks/use-config"

export const OptionsPage = () => {
  const {
    getOpenAIKey,
    setOpenAIKey,
    getOpenAIModel,
    setOpenAIModel,
    OPENAI_MODELS
  } = useConfig()

  const [openaiKey, setOpenaiKey] = useState(getOpenAIKey())
  const [openaiModel, setOpenaiModel] = useState(getOpenAIModel())
  const [isValidForm, setIsValidForm] = useState(false)

  useEffect(() => {
    setIsValidForm(openaiKey !== "" && openaiModel !== "")
  }, [openaiKey, openaiModel])

  const onSubmit = useCallback(() => {
    setOpenAIKey(openaiKey)
    setOpenAIModel(openaiModel)
    chrome.tabs.getCurrent((tab) => {
      chrome.tabs.remove(tab.id)
    })
    chrome.tabs.create({ url: "chrome://newtab" })
  }, [openaiKey, openaiModel])

  return (
    <Card className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2">
      <CardBody className="flex flex-row p-0">
        <div className="bg-gradient-to-r from-green-900 to-green-500 w-full h-full"></div>
        <div className="flex flex-col justify-center w-full p-0">
          <div className="flex flex-col absolute top-0 w-full p-4 gap-y-4">
            <p className="font-semibold text-medium">Setup Bonsai</p>
            <Divider />
          </div>
          <div className="flex flex-col p-4 gap-y-4">
            <Input
              endContent={<RiOpenaiFill size={24} />}
              label="OpenAI API Key"
              placeholder="Enter your key here"
              variant="bordered"
              type="password"
              value={openaiKey}
              isRequired
              onChange={(e) => {
                setOpenaiKey(e.target.value)
              }}
              description="Your key will be stored locally and will never be shared."
            />
            <Select
              label="OpenAI Model"
              variant="bordered"
              placeholder="Select a model"
              defaultSelectedKeys={[openaiModel]}
              onChange={(e) => {
                setOpenaiModel(e.target.value)
              }}
              description="The model to use for generating text.">
              {OPENAI_MODELS.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </Select>
            <Button
              className="bg-green-500 mt-8"
              onClick={onSubmit}
              isDisabled={!isValidForm}>
              Save
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default OptionsPage

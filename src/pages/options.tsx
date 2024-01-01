import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem
} from "@nextui-org/react"
import React, { useCallback, useState } from "react"
import { RiOpenaiFill } from "react-icons/ri"

const OPENAI_MODELS = [
  {
    label: "GPT-4 Turbo",
    value: "gpt-4-1106-preview"
  },
  {
    label: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo"
  }
]

export const LOCAL_STORAGE_OPENAI_KEY = "bonsai-openai-key"
export const LOCAL_STORAGE_OPENAI_MODEL = "bonsai-model"

export const OptionsPage = () => {
  const [openaiModel, setOpenaiModel] = useState(
    localStorage.getItem(LOCAL_STORAGE_OPENAI_MODEL) || OPENAI_MODELS[0].value
  )

  const [openaiKey, setOpenaiKey] = useState(
    localStorage.getItem(LOCAL_STORAGE_OPENAI_KEY) || ""
  )

  const onSubmit = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_OPENAI_KEY, openaiKey)
    localStorage.setItem(LOCAL_STORAGE_OPENAI_MODEL, openaiModel)
  }, [openaiKey, openaiModel])

  return (
    <Card className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2">
      <CardBody className="flex flex-row p-0">
        <div className="bg-gradient-to-r from-green-900 to-green-500 w-full h-full"></div>
        <div className="flex flex-col gap-y-4 justify-center w-full p-4">
          <Input
            endContent={<RiOpenaiFill size={24} />}
            label="OpenAI API Key"
            placeholder="Enter your key here"
            variant="bordered"
            type="password"
            value={openaiKey}
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
          <Button className="bg-green-500 mt-8" onClick={onSubmit}>
            Save
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default OptionsPage

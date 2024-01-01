import { useState } from "react"

export const LOCAL_STORAGE_OPENAI_KEY = "bonsai-openai-key"
export const LOCAL_STORAGE_OPENAI_MODEL = "bonsai-model"

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

const readValueFromLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}

const writeValueToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

const getOpenAIKey = () => {
  return readValueFromLocalStorage(LOCAL_STORAGE_OPENAI_KEY) || ""
}

const setOpenAIKey = (value: string) => {
  writeValueToLocalStorage(LOCAL_STORAGE_OPENAI_KEY, value)
}

const getOpenAIModel = () => {
  return (
    readValueFromLocalStorage(LOCAL_STORAGE_OPENAI_MODEL) ||
    OPENAI_MODELS[0].value
  )
}

const setOpenAIModel = (value: string) => {
  writeValueToLocalStorage(LOCAL_STORAGE_OPENAI_MODEL, value)
}

export const useConfig = () => {
  return {
    getOpenAIKey,
    setOpenAIKey,
    getOpenAIModel,
    setOpenAIModel,
    OPENAI_MODELS
  }
}

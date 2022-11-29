import { Dispatch, SetStateAction } from "react"

export interface QuestionProps {
    isClick: "one" | "two" | "three" | "four"
    setIsClick: Dispatch<SetStateAction<string>>
    basePrompt: string
    setBasePrompt: Dispatch<SetStateAction<string>>
}

import { Dispatch, SetStateAction } from "react"

export interface QuestionProps {
    isClick: "one" | "two" | "three" | "four" | "generate" | "showImage"
    setIsClick: Dispatch<SetStateAction<string>>
    basePrompt: string
    setBasePrompt: Dispatch<SetStateAction<string>>
}

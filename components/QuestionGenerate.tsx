import QuestionButton from "./questionButton"
import { type QuestionProps } from "../types/QuestionProps"

interface Generate extends QuestionProps {
    imgbase64: string
    basePrompt: string
}
const QuestionGenerate = ({ isClick, setIsClick }: QuestionProps) => {
    return (
        <div>
            <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                Generate!
            </QuestionButton>
        </div>
    )
}

export default QuestionGenerate

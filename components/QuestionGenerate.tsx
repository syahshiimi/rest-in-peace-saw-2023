import QuestionButton from "./questionButton"
import { type QuestionProps } from "../types/QuestionProps"

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

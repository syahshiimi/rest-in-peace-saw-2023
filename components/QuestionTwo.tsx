import { type QuestionProps } from "../types/QuestionProps"
import QuestionButton from "./questionButton"

const QuestionTwo = ({
    isClick,
    setIsClick,
    setBasePrompt,
    basePrompt,
}: QuestionProps) => {
    const QuestionTwoPrompts: string[] = [
        "high key, contrasty lighting with good ambience",
        "low key, soft contrast and depressing lighting",
        "high key, contrasty lighting with popping energetic colors",
        "low key, high contrast black and white lighting with dense constrasts",
    ]
    return (
        <>
            <div className="pb-8 text-7xl font-bold">Question #2</div>
            <h2 className="text-center text-4xl font-semibold">
                Peace Center is an important place for some of us.
                <br />
                <br />
                We&apos;d like to know more about how you feel.
                <br />
                <br />
                <i className="text-3xl tracking-tight">
                    What is your fondest memory of Peace Center?
                </i>
                <div className="grid grid-cols-2 gap-4 pt-8">
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionTwoPrompts?.[0]}
                        setBasePrompt={setBasePrompt}
                    >
                        I often come to eat and buy things.
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionTwoPrompts?.[1]}
                        setBasePrompt={setBasePrompt}
                    >
                        I work in this building.
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionTwoPrompts?.[2]}
                        setBasePrompt={setBasePrompt}
                    >
                        I often come here to spend time with my family
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionTwoPrompts?.[3]}
                        setBasePrompt={setBasePrompt}
                    >
                        I dont have much memories of Peace Center
                    </QuestionButton>
                </div>
            </h2>
        </>
    )
}
export default QuestionTwo

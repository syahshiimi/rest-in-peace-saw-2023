import { type QuestionProps } from "../types/QuestionProps"
import QuestionButton from "./questionButton"

const QuestionOne = ({
    isClick,
    setIsClick,
    setBasePrompt,
    basePrompt,
}: QuestionProps) => {
    const QuestionOnePrompts: string[] = [
        "high resolution octane render of a busy brutalist mall",
        "digital photographic image of a brutalist mall",
        "film grain image of a vintage brutalist interior",
        "fading, black and white grainy portrayal of vintage interior",
    ]

    return (
        <>
            <div className="pb-8 text-7xl font-bold">Question #1:</div>
            <h2 className="text-4xl font-semibold">
                We’d like to know more about you before we begin.
                <br />
                <br />
                <i className="text-3xl tracking-tight">
                    How often do you visit Peace Center?
                </i>
                <div className="grid grid-cols-2 gap-4 pt-8">
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionOnePrompts?.[0]}
                        setBasePrompt={setBasePrompt}
                    >
                        I visit it frequently.
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionOnePrompts?.[1]}
                        setBasePrompt={setBasePrompt}
                    >
                        I visit it occassionally.
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionOnePrompts?.[2]}
                        setBasePrompt={setBasePrompt}
                    >
                        I visit if I am nearby.
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionOnePrompts?.[3]}
                        setBasePrompt={setBasePrompt}
                    >
                        I visit it rarely.
                    </QuestionButton>
                </div>
            </h2>
        </>
    )
}
export default QuestionOne

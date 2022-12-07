import { type QuestionProps } from "../types/QuestionProps"
import QuestionButton from "./questionButton"

const QuestionFour = ({
    isClick,
    setIsClick,
    basePrompt,
    setBasePrompt,
}: QuestionProps) => {
    const QuestionFourPrompts: string[] = [
        "modern, lively, colourful",
        "nostalgic, charming",
        "peaceful, quiet, empty",
        "optimistic, modern",
    ]

    return (
        <>
            <div className="pb-8 text-7xl font-bold">Question #4</div>
            <h2 className="text-4xl font-semibold">
                Peace Center will soon make way for a new development and be in
                line with the new presence of its vicinity.
                <br />
                <br />
                <i className="text-3xl tracking-tight">
                    If you had a chance to build something, what would you
                    transform Peace Center to?
                </i>
                <div className="grid grid-cols-2 gap-4 pt-8">
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionFourPrompts?.[0]}
                        setBasePrompt={setBasePrompt}
                    >
                        I hope the future development will be more contemporary
                        and help to reliven the perception of the area!
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionFourPrompts?.[1]}
                        setBasePrompt={setBasePrompt}
                    >
                        I hope the overall vibe and energy can be kept. Peace
                        Center has its charm and vibe.
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionFourPrompts?.[2]}
                        setBasePrompt={setBasePrompt}
                    >
                        I like Peace Center the way it is.
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionFourPrompts?.[3]}
                        setBasePrompt={setBasePrompt}
                    >
                        I hope Peace Center can be revitalized into something
                        more energetic and relevant.
                    </QuestionButton>
                </div>
            </h2>
        </>
    )
}
export default QuestionFour

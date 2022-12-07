import { type QuestionProps } from "../types/QuestionProps"
import QuestionButton from "./questionButton"

const QuestionThree = ({
    isClick,
    setIsClick,
    basePrompt,
    setBasePrompt,
}: QuestionProps) => {
    const QuestionThreePrompts: string[] = [
        "neon lights, digital future, futuristic architecture",
        "black and white, old photography",
        "sepia tone, 70s wallpaper, peeling textures",
        "neutral colours, concrete future, construction and scaffolding",
    ]
    return (
        <>
            <div className="pb-8 text-7xl font-bold">Question #3</div>
            <h2 className="text-4xl font-semibold">
                Peace Center will be en-bloc later this year in Aug 2023. For
                some it is a moment of joy and for some, a painful reminder that
                things can change too fast.
                <br />
                <br />
                <i className="text-3xl tracking-tight">
                    How do you feel about this situation?
                </i>
                <div className="grid grid-cols-2 gap-4 pt-8">
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionThreePrompts?.[0]}
                        setBasePrompt={setBasePrompt}
                    >
                        I am excited for what&apos;s to come next!
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionThreePrompts?.[1]}
                        setBasePrompt={setBasePrompt}
                    >
                        I hope the tenants will find a space afterwards. It is a
                        sad moment but life goes on.
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionThreePrompts?.[2]}
                        setBasePrompt={setBasePrompt}
                    >
                        I have a lot of memories that I cherish here. I am sad
                        it will disappear.
                    </QuestionButton>
                    <QuestionButton
                        setIsClick={setIsClick}
                        isClick={isClick}
                        basePrompt={QuestionThreePrompts?.[3]}
                        setBasePrompt={setBasePrompt}
                    >
                        I am not sure how to feel.
                    </QuestionButton>
                </div>
            </h2>
        </>
    )
}

export default QuestionThree

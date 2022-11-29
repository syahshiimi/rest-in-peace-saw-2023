import { type Dispatch, ReactNode, SetStateAction } from "react"

interface QuestionButtonProps {
    children?: ReactNode
    isClick?: string | undefined
    setIsClick?: Dispatch<SetStateAction<string>>
}

const QuestionButton = ({
    children,
    isClick,
    setIsClick,
}: QuestionButtonProps) => {
    const setBool = () => {
        if (setIsClick != undefined) {
            if (isClick == "one") {
                setIsClick("two")
            } else if (isClick == "two") {
                setIsClick("three")
            }
        }
    }
    return (
        <button
            className="flex max-w-xl flex-row items-center justify-center rounded-2xl bg-slate-500 px-4 py-4 text-slate-300 shadow-lg"
            onClick={setBool}
        >
            {children}
        </button>
    )
}

export default QuestionButton

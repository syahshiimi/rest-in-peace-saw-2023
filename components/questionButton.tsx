import { type Dispatch, ReactNode, SetStateAction } from "react"

interface QuestionButtonProps {
    children?: ReactNode
    isClick?: string | undefined
    basePrompt?: string | undefined
    setIsClick?: Dispatch<SetStateAction<string>>
    setBasePrompt?: Dispatch<SetStateAction<any>>
    PostRequest?: (payload: any, setStableImage: any) => void
}

const QuestionButton = ({
    children,
    isClick,
    setIsClick,
    basePrompt,
    setBasePrompt,
    PostRequest,
}: QuestionButtonProps) => {
    const setBool = () => {
        if (isClick && setIsClick != undefined) {
            setIsClick(isClick)
        }
    }
    const setPrompt = () => {
        if (setBasePrompt != undefined) {
            setBasePrompt(basePrompt)
        }
    }

    const sendPostReq = () => {
        if (PostRequest != undefined) {
            PostRequest()
        } else {
            null
        }
    }
    const onClick = () => {
        setBool()
        setPrompt()
        sendPostReq()
    }

    return (
        <button
            className="flex max-w-xl flex-row items-center justify-center rounded-2xl bg-yellow-800 px-4 py-4 text-lg text-slate-300 
            shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-yellow-500/80"
            onClick={() => onClick()}
        >
            {children}
        </button>
    )
}

export default QuestionButton

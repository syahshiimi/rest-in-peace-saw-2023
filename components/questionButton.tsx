import { type Dispatch, ReactNode, SetStateAction } from "react"

interface QuestionButtonProps {
    children?: ReactNode
    isClick?: string | undefined
    basePrompt?: string | undefined
    setIsClick?: Dispatch<SetStateAction<string>> | undefined
    setBasePrompt?: Dispatch<SetStateAction<string>> | undefined
    PostRequest?: () => void
    screensaverOff: string | undefined
    setScreensaverOff: Dispatch<SetStateAction<string>> | undefined
}

const QuestionButton = ({
    children,
    isClick,
    setIsClick,
    basePrompt,
    setBasePrompt,
    PostRequest,
    screensaverOff,
    setScreensaverOff
}: QuestionButtonProps) => {
    const setBool = () => {
        if (isClick && setIsClick != undefined) {
            setIsClick(isClick)
        }
    }
    const setPrompt = () => {
        if (setBasePrompt && basePrompt != undefined) {
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

    const removeScreensaver = () => {
        if (screensaverOff == "absolute hidden") {
            setScreensaverOff("")
        }  else if (screensaverOff == "") {
            setScreensaverOff("absolute hidden")
        }
    }



    return (
        <button
            className="flex max-w-xl flex-row items-center justify-center rounded-2xl bg-yellow-700 px-4 py-4 text-lg text-slate-300 
            shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-yellow-500/80"
            onClick={() => {
                setBool(), setPrompt(), sendPostReq(), removeScreensaver()
            }}
        >
            {children}
        </button>
    )
}

export default QuestionButton

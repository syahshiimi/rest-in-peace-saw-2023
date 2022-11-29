import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import QuestionButton from "../components/questionButton"
import Image from "next/image"
import useSWR from "swr"
import randomIntFromInterval from "../src/minmaxgenerate"

const getBase64StringFromDataURL = (dataURL: any) =>
    dataURL.replace("data:", "").replace(/^.+,/, "")

interface QuestionProps {
    isClick: "one" | "two" | "three" | "four"
    setIsClick: Dispatch<SetStateAction<string>>
    basePrompt: string
    setBasePrompt: Dispatch<SetStateAction<string>>
}

const QuestionOne = ({
    isClick,
    setIsClick,
    setBasePrompt,
    basePrompt,
}: QuestionProps) => {
    const QuestionOnePrompts = [
        "high key, contrasty lighting",
        "low key, soft contrast and depressing lighting",
        "high key, contrasty lighting with popping energetic colors",
        "low key, high contrast black and white daido moriyama style lighting",
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
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I visit it occassionally.
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I visit if I am nearby.
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I visit it rarely.
                    </QuestionButton>
                </div>
            </h2>
        </>
    )
}

const QuestionTwo = ({ isClick, setIsClick }: QuestionProps) => {
    return (
        <>
            <div className="pb-8 text-7xl font-bold">Question #2</div>
            <h2 className="text-4xl font-semibold">
                Peace Center is an important place for some of us.
                <br />
                We'd like to know more about how you feel.
                <br />
                <br />
                <i className="text-3xl tracking-tight">
                    What is your fondest memory of Peace Center?
                </i>
                <div className="grid grid-cols-2 gap-4 pt-8">
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I often come to eat and buy things.
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I work in this building.
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I often come here to spend time with my family
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I dont have much memories of Peace Center
                    </QuestionButton>
                </div>
            </h2>
        </>
    )
}

const QuestionThree = ({ isClick, setIsClick }: QuestionProps) => {
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
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I am excited for what's to come next!
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I hope the tenants will find a space afterwards. It is a
                        sad moment but life goes on.
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I have a lot of memories that I cherish here. I am sad
                        it will disappear.
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I am not sure how to feel.
                    </QuestionButton>
                </div>
            </h2>
        </>
    )
}

const QuestionFour = ({ isClick, setIsClick }: QuestionProps) => {
    return (
        <>
            <div className="pb-8 text-7xl font-bold">Question #4</div>
            <h2 className="text-4xl font-semibold">
                Peace Center will soon make way for a new development and be in
                line with the new presence of its vicinity. .
                <br />
                <br />
                <i className="text-3xl tracking-tight">
                    If you had a chance to build something, what would you
                    transform Peace Center to?
                </i>
                <div className="grid grid-cols-2 gap-4 pt-8">
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I hope the future development will be more contemporary
                        and help to reliven the perception of the area!
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I hope the overall vibe and energy can be kept. Peace
                        Center has its charm and vibe.
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I like Peace Center the way it is.
                    </QuestionButton>
                    <QuestionButton setIsClick={setIsClick} isClick={isClick}>
                        I hope Peace Center can be revitalized into something
                        more energetic and relevant.
                    </QuestionButton>
                </div>
            </h2>
        </>
    )
}

const rndInt = randomIntFromInterval(1, 10)
const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

export default function Home() {
    const [imgbase64, setImgBase64] = useState<string>()
    const [img, setimg] = useState<string>("/images/peace-center-2.jpg")
    const [isClick, setIsClick] = useState<string>("one")

    // Prompt Generation
    const [basePromptOne, setBasePromptOne] = useState<string>(
        "faded and grainy wide angle shot of a vintage 80's interior"
    )
    const [basePromptTwo, setBasePromptTwo] = useState<string>("futuristic")
    const [basePromptThree, setBasePromptThree] = useState<string>(
        "soft and dreamy lighting"
    )
    const [basePromptFour, setBasePromptFour] =
        useState<string>("wong-kar wai vibe")

    const basePrompt = `${basePromptOne}, ${basePromptTwo}, ${basePromptThree}, ${basePromptFour}, `

    // fetch images from backend
    const { data, error } = useSWR("api/getimageblob", fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0,
    })

    useEffect(() => {
        setimg(data?.[rndInt])
        if (img != undefined) {
            fetch(img)
                .then((res) => res.blob())
                .then((blob) => {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        const base64 = getBase64StringFromDataURL(reader.result)
                        setImgBase64(base64)
                    }
                    reader.readAsDataURL(blob)
                })
        }
    }, [img, imgbase64, data, error])

    // const [payloadData, setData] = useState<any>()

    // const payload = {
    //     init_images: [`data:image/png;base64,${imgbase64}`],
    //     include_init_images: true,
    //     denoising_strength: 0.47,
    //     steps: 20,
    //     cfg_scale: 9,
    //     prompt: "faded and grainy wide angle shot of a vintage 80s interior, futuristic, soft and dreamy lighting, cyberpunk 2077 aesthetic",
    // }

    // function GenerateImage() {
    //     const options = {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //             accept: "application/json",
    //         },
    //         body: JSON.stringify(payload),
    //     }

    //     fetch("http://192.168.1.140:7860/sdapi/v1/img2img", options)
    //         .then((response) => response.json())
    //         .then((response) => setData(response))
    //         .then((response) => console.log(response))
    // }

    const setView = () => {
        if (isClick == "one") {
            return (
                <QuestionOne
                    isClick={"one"}
                    setIsClick={setIsClick}
                    basePrompt={basePromptOne}
                    setBasePrompt={setBasePromptOne}
                />
            )
        } else if (isClick == "two") {
            return (
                <QuestionTwo
                    isClick={"two"}
                    setIsClick={setIsClick}
                    basePrompt={basePromptTwo}
                    setBasePrompt={setBasePromptTwo}
                />
            )
        } else if (isClick == "three") {
            return (
                <QuestionThree
                    isClick={"three"}
                    setIsClick={setIsClick}
                    basePrompt={basePromptThree}
                    setBasePrompt={setBasePromptThree}
                />
            )
        } else if (isClick === "four") {
            return (
                <QuestionFour
                    isClick={"four"}
                    setIsClick={setIsClick}
                    basePrompt={basePromptFour}
                    setBasePrompt={setBasePromptFour}
                />
            )
        }
    }

    console.log(basePrompt)

    return (
        <div className="container mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center">
            {setView()}
        </div>
    )
}

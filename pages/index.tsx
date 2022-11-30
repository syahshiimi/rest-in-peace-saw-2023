import { useEffect, useState } from "react"
import Image from "next/image"
import useSWR from "swr"
import randomIntFromInterval from "../src/minmaxgenerate"

import QuestionOne from "../components/QuestionOne"
import QuestionTwo from "../components/QuestionTwo"
import QuestionThree from "../components/QuestionThree"
import QuestionFour from "../components/QuestionFour"
import QuestionButton from "../components/questionButton"

import GenerateImage2Image from "../src/generateimg2img"

const getBase64StringFromDataURL = (dataURL: any) =>
    dataURL.replace("data:", "").replace(/^.+,/, "")

const randomInt = randomIntFromInterval(0, 12)

export default function Home() {
    const [imgbase64, setImgBase64] = useState<string>()
    const [img, setimg] = useState<string>()
    const [isClick, setIsClick] = useState<string>("one")
    const [StableImage, setStableImage] = useState<any>() // fix this from any to correct type

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

    const fetcher = (url: RequestInfo | URL) =>
        fetch(url).then((res) => res.json())
    const { data, error } = useSWR("api/getimageblob", fetcher, {})

    useEffect(() => {
        setimg(data?.[randomInt])
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

    const payload = {
        init_images: [`data:image/png;base64,${imgbase64}`],
        include_init_images: true,
        denoising_strength: 0.47,
        steps: 20,
        cfg_scale: 9,
        prompt: basePrompt,
    }

    const postData = () => {
        GenerateImage2Image(payload, setStableImage)
    }

    const setView = () => {
        if (isClick == "one") {
            return (
                <QuestionOne
                    isClick={"two"}
                    setIsClick={setIsClick}
                    basePrompt={basePromptOne}
                    setBasePrompt={setBasePromptOne}
                />
            )
        } else if (isClick == "two") {
            return (
                <QuestionTwo
                    isClick={"three"}
                    setIsClick={setIsClick}
                    basePrompt={basePromptTwo}
                    setBasePrompt={setBasePromptTwo}
                />
            )
        } else if (isClick == "three") {
            return (
                <QuestionThree
                    isClick={"four"}
                    setIsClick={setIsClick}
                    basePrompt={basePromptThree}
                    setBasePrompt={setBasePromptThree}
                />
            )
        } else if (isClick === "four") {
            return (
                <QuestionFour
                    isClick={"generate"}
                    setIsClick={setIsClick}
                    basePrompt={basePromptFour}
                    setBasePrompt={setBasePromptFour}
                />
            )
        } else if (isClick === "generate") {
            return (
                <QuestionButton
                    setIsClick={setIsClick}
                    isClick={"showImage"}
                    PostRequest={postData}
                >
                    Generate!
                </QuestionButton>
            )
        } else if (isClick === "showImage") {
            return (
                <div>
                    {!StableImage ? (
                        <div>...loading</div>
                    ) : (
                        <Image
                            src={`data:image/png;base64, ${StableImage?.images}`}
                            alt="SD image"
                            width={512}
                            height={512}
                        />
                    )}
                </div>
            )
        }
    }

    return (
        <div className="container mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center">
            {setView()}
            <div className="pt-8">{basePrompt}</div>
        </div>
    )
}

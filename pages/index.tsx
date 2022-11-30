import { useEffect, useState } from "react"
import Image from "next/image"
import useSWR from "swr"
import randomIntFromInterval from "../src/minmaxgenerate"

import QuestionOne from "../components/QuestionOne"
import QuestionTwo from "../components/QuestionTwo"
import QuestionThree from "../components/QuestionThree"
import QuestionFour from "../components/QuestionFour"
import QuestionGenerate from "../components/QuestionGenerate"

const getBase64StringFromDataURL = (dataURL: any) =>
    dataURL.replace("data:", "").replace(/^.+,/, "")

const rndInt = randomIntFromInterval(1, 10)
const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

export default function Home() {
    const [imgbase64, setImgBase64] = useState<string>()
    const [img, setimg] = useState<string>()
    const [isClick, setIsClick] = useState<string>("one")
    const [StableImage, setStableImage] = useState<string>()

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
        // revalidateOnFocus: false,
        // // revalidateOnMount: false,
        // revalidateOnReconnect: false,
        // refreshWhenOffline: false,
        // refreshWhenHidden: false,
        // refreshInterval: 0,
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

    // Payload generation
    const payload = {
        init_images: [`data:image/png;base64,${imgbase64}`],
        include_init_images: true,
        denoising_strength: 0.47,
        steps: 20,
        cfg_scale: 9,
        prompt: basePrompt,
    }

    function GenerateImage() {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(payload),
        }

        fetch("http://127.0.0.1:7860/sdapi/v1/img2img", options)
            .then((response) => response.json())
            .then((response) => setStableImage(response))
            .then((response) => console.log(response))
    }

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
        } else if (isClick === "generate") {
            return (
                <QuestionGenerate isClick="generate" setIsClick={setIsClick} />
            )
        } else if (isClick === "showImage") {
            return <div>IMAGE HERE</div>
        }
    }

    return (
        <div className="container mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center">
            {setView()}
            <div className="pt-8">{basePrompt}</div>
            <button className="bg-red-500" onClick={() => GenerateImage()}>
                Generate
            </button>
            {!StableImage ? (
                null || undefined
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

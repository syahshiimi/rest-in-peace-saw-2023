import { useEffect, useState } from "react"
import Image from "next/image"
import useSWR from "swr"
import randomIntFromInterval from "../src/minmaxgenerate"

import QuestionOne from "../components/QuestionOne"
import QuestionTwo from "../components/QuestionTwo"
import QuestionThree from "../components/QuestionThree"
import QuestionFour from "../components/QuestionFour"
import { GenerateImage2ImageProps } from "../types/GenerateImage2ImageProps"

const getBase64StringFromDataURL = (dataURL: any) =>
    dataURL.replace("data:", "").replace(/^.+,/, "")

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

    // Payload generation
    const payload = {
        init_images: [`data:image/png;base64,${imgbase64}`],
        include_init_images: true,
        denoising_strength: 0.47,
        steps: 20,
        cfg_scale: 9,
        prompt: { basePrompt },
    }

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
            <div className="pt-8">{basePrompt}</div>
        </div>
    )
}

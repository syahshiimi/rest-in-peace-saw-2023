import { ReactNode, useEffect, useRef, useState } from "react"
import QuestionButton from "../components/questionButton"
import Image from "next/image"
import useSWR from "swr"

const getBase64StringFromDataURL = (dataURL: any) =>
    dataURL.replace("data:", "").replace(/^.+,/, "")

interface QuestionOneProps {
    imgbase64?: string
}

const QuestionOne = ({ imgbase64 }: QuestionOneProps) => {
    const [payloadData, setData] = useState<any>()

    const payload = {
        init_images: [`data:image/png;base64,${imgbase64}`],
        include_init_images: true,
        denoising_strength: 0.47,
        steps: 20,
        cfg_scale: 9,
        prompt: "faded and grainy wide angle shot of a vintage 80s interior, futuristic, soft and dreamy lighting, cyberpunk 2077 aesthetic",
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

        fetch("http://192.168.1.140:7860/sdapi/v1/img2img", options)
            .then((response) => response.json())
            .then((response) => setData(response))
            .then((response) => console.log(response))
    }

    return (
        <>
            <div className="pb-8 text-7xl font-bold">Question #1:</div>
            <h2 className="text-4xl font-semibold">
                We’d like to know more about you before we begin.
                <br />
                <br />
                <i className="text-3xl tracking-tight">
                    What is your relationship with Peace Center?
                </i>
                <div className="grid grid-cols-2 gap-4 pt-8">
                    <QuestionButton postData={GenerateImage}>
                        I visit it frequently.
                    </QuestionButton>
                    <QuestionButton>I visit it occassionally.</QuestionButton>
                    <QuestionButton>I visit it rarely.</QuestionButton>
                </div>
                <div className="w-[250px]">
                    {!payloadData ? (
                        null || undefined
                    ) : (
                        <Image
                            src={`data:image/png;base64, ${payloadData?.images}`}
                            alt="SD image"
                            width={512}
                            height={512}
                        />
                    )}
                </div>
            </h2>
        </>
    )
}

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const rndInt = randomIntFromInterval(1, 10)
console.log(rndInt)


export default function Home() {
    const [imgbase64, setImgBase64] = useState<any>()
    const [img, setimg] = useState<any>()
    // const [imagelist, setImgList] = useState<any>()

    const image = "/images/peace-center-3.jpg"

    const fetcher = (url: RequestInfo | URL) =>
        fetch(url).then((res) => res.json())

    const { data } = useSWR("api/getimageblob", fetcher)

    useEffect(() => {
        setimg(data?.[rndInt])
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
    }, [img, imgbase64, data])

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <QuestionOne imgbase64={imgbase64} />
        </div>
    )
}

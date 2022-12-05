import React, { useEffect, useState } from "react"
import Image from "next/image"
import useSWR from "swr"
import randomIntFromInterval from "../src/MinMaxGenerator"

import QuestionOne from "../components/QuestionOne"
import QuestionTwo from "../components/QuestionTwo"
import QuestionThree from "../components/QuestionThree"
import QuestionFour from "../components/QuestionFour"
import QuestionButton from "../components/questionButton"

import GenerateImage2Image, { payloadProps } from "../src/GenerateImage2Image"
// import * as tf from "@tensorflow/tfjs-backend-core"
import "@tensorflow/tfjs-backend-webgl"
import * as bodySegmentation from "@tensorflow-models/body-segmentation"

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

    let width = 320 // We will scale the photo width to this
    let height = 0 // This will be computed based on the input stream

    let streaming = false

    let video: any = null
    let context: any = null
    let canvas: any = null
    let photo: any = null
    let startbutton: any = null

    const clearphoto = () => {
        const context = canvas.getContext("2d")
        context.fillStyle = "#AAA"
        context.fillRect(0, 0, canvas.width, canvas.height)

        const data = canvas.toDataURL("image/png")
        photo.setAttribute("src", data)
    }
    const takepicture = () => {
        const context = canvas.getContext("2d")
        if (width && height) {
            canvas.width = width
            canvas.height = height
            context.drawImage(video, 0, 0, width, height)

            const data = canvas.toDataURL("image/png")
            photo.setAttribute("src", data)
        } else {
            clearphoto()
        }
    }

    const startWebcam = () => {
        video = document.getElementById("video")
        canvas = document.getElementById("canvas")
        photo = document.getElementById("photo")
        startbutton = document.getElementById("startbutton")
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream
                //video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`)
            })
        video.addEventListener(
            "canplay",
            (ev: any) => {
                if (!streaming) {
                    height = (video.videoHeight / video.videoWidth) * width

                    video.setAttribute("width", width)
                    video.setAttribute("height", height)
                    canvas.setAttribute("width", width)
                    canvas.setAttribute("height", height)
                    streaming = true
                }
            },
            false
        )
    }

    const takeImageClick = (e: React.FormEvent) => {
        // startbutton.addEventListener("click", (ev) => {
        takepicture()
        e.preventDefault()
        // }, true)
    }

    async function segmenter() {
        // const img: any = document.getElementById("video")
        // const model =
        //     bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation
        // const segmenterConfig: any = {
        //     runtime: "mediapipe", // or 'tfjs'
        //     solutionPath:
        //         "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
        //     modelType: "general",
        // }
        // const segmenter = await bodySegmentation.createSegmenter(
        //     model,
        //     segmenterConfig
        // )
        // const people = await segmenter.segmentPeople(img)

        // const foregroundThreshold = 0.5
        // const backgroundBlurAmount = 3
        // const edgeBlurAmount = 3
        // const flipHorizontal = false
        // const canvas: any = document.getElementById("canvas")
        // await bodySegmentation.drawBokehEffect(
        //     canvas,
        //     img,
        //     people,
        //     foregroundThreshold,
        //     backgroundBlurAmount,
        //     edgeBlurAmount,
        //     flipHorizontal
        // )
        const img: any = document.getElementById("photo")

        const model =
            bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation
        const segmenterConfig: any = {
            runtime: "mediapipe", // or 'tfjs'
            solutionPath:
                "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
            modelType: "general",
        }
        const segmenter = await bodySegmentation.createSegmenter(
            model,
            segmenterConfig
        )

        const segmentation = await segmenter.segmentPeople(img)

        // Convert the segmentation into a mask to darken the background.
        const foregroundColor = { r: 0, g: 0, b: 0, a: 0 }
        const backgroundColor = { r: 0, g: 0, b: 0, a: 255 }
        const backgroundDarkeningMask = await bodySegmentation.toBinaryMask(
            segmentation,
            foregroundColor,
            backgroundColor
        )

        const opacity = 0.7
        const maskBlurAmount = 3
        const flipHorizontal = false
        const canvas: any = document.getElementById("canvas")
        // Draw the mask onto the image on a canvas.  With opacity set to 0.7 and
        // maskBlurAmount set to 3, this will darken the background and blur the
        // darkened background's edge.
        await bodySegmentation.drawMask(
            canvas,
            img,
            backgroundDarkeningMask,
            opacity,
            maskBlurAmount,
            flipHorizontal
        )
    }

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

    const payload: payloadProps = {
        init_images: [`data:image/png;base64,${imgbase64}`],
        include_init_images: true,
        denoising_strength: 0.47,
        steps: 20,
        cfg_scale: 9,
        prompt: basePrompt,
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
                    PostRequest={() =>
                        GenerateImage2Image(payload, setStableImage)
                    }
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
            <button
                id="startbutton"
                className="bg-green-500"
                onClick={startWebcam}
            >
                Start Webcam
            </button>

            <div className="flex flex-row">
                {" "}
                <div id="camera">
                    <video id="video" autoPlay={true}>
                        Video stream not available.
                    </video>
                    <button
                        id="startbutton"
                        className="px-2"
                        onClick={takeImageClick}
                    >
                        Take photo
                    </button>
                    <button id="startbutton" className="px-2">
                        Canvas Video
                    </button>
                    <button id="startbutton" onClick={segmenter}>
                        See bokeh picture
                    </button>
                </div>
                <div id="output">
                    <img
                        id="photo"
                        alt="The screen capture will appear in this box."
                    />
                </div>
            </div>
            <canvas id="canvas" className="">
                {" "}
            </canvas>
        </div>
    )
}

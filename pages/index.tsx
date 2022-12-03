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

    let width = 320;    // We will scale the photo width to this
    let height = 0;     // This will be computed based on the input stream

    let streaming = false;

    let video: any = null;
    let canvas: any = null;
    let photo: any = null;
    let startbutton: any = null;

    function clearphoto() {
        const context = canvas.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
    }
    function takepicture() {
        const context = canvas.getContext("2d");
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            const data = canvas.toDataURL("image/png");
            photo.setAttribute("src", data);
        } else {
            clearphoto();
        }
    }

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                //video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`);
            });
        video.addEventListener(
            "canplay",
            (ev: any) => {
                if (!streaming) {
                    height = (video.videoHeight / video.videoWidth) * width;

                    video.setAttribute("width", width);
                    video.setAttribute("height", height);
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                    streaming = true;
                }
            },
            false
        );
        // startbutton.addEventListener(
        //     "click",
        //     (ev) => {
        //         takepicture();
        //         // ev.preventDefault();
        //     },
        //     false
        // );

        // clearphoto();
    }

    const getImageClick = (e: React.FormEvent) => {
        // startbutton.addEventListener("click", (ev) => {
        takepicture();
        e.preventDefault();
        // }, true)
    }

    useEffect(() => {
        startup()
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
            <div className="flex flex-row">            <div id="camera">
                <video id="video" autoPlay={true} >Video stream not available.</video>
                <button id="startbutton" onClick={getImageClick}>Take photo</button>
            </div>
                <canvas id="canvas" className="hidden invisible"> </canvas>
                <div id="output">
                    <img id="photo" alt="The screen capture will appear in this box." />
                </div>
            </div>


        </div>
    )
}

import { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import * as bodySegmentation from "@tensorflow-models/body-segmentation"
import "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-backend-webgl"
import html2canvas from "html2canvas"
import AlertModal from "../components/alertModal"

interface CameraProps {
    getGenerateImage: string | undefined
}

const Camera = ({
    getGenerateImage = "/testImages/test_image_2.png",
}: CameraProps) => {
    const webcamRef = useRef<any>(null)
    const canvasRef = useRef<any>(null)
    const chromaRef = useRef<any>(null)
    const imageRef = useRef<any>(null)
    const appendRef = useRef<any>(null)
    const modalRef = useRef<any>(null)

    const [isOpen, setIsOpen] = useState(false)

    const videoConstraints = {
        width: 1000, // actual height (after rotation)
        height: 1920, // actual width (after rotation)
        // aspectRation: 1.777777777777778,
    }

    const saveAs = (uri: string, filename: string) => {
        const link = document.createElement("a")
        if (typeof link.download === "string") {
            link.href = uri
            link.download = filename
            link.click()
        }
    }

    // set image size on canvas and later for saving
    const canvasImageConfig = {
        width: 977,
        height: 977,
        windowWidth: 977,
        windowHHeight: 977,
        backgroundColor: null,
        removeContainer: true,
    }

    const setAppendImage = () => {
        html2canvas(imageRef.current, canvasImageConfig).then(function (
            imageRef
        ) {
            appendRef.current.appendChild(imageRef)
        })
    }
    const setModalImage = () => {
        html2canvas(imageRef.current, canvasImageConfig).then(function (
            imageRef
        ) {
            modalRef.current.appendChild(imageRef)
        })
    }

    const clearAppendImage = () => {
        appendRef.current.removeChild(appendRef.current.firstChild)
    }

    // Save Image
    const saveImage = () => {
        html2canvas(appendRef.current, canvasImageConfig).then(function (
            appendRef
        ) {
            saveAs(appendRef.toDataURL(), "new-image.png")
        })
    }

    useEffect(() => {
        // load bodySegmentation model on page render
        const loadModel = async () => {
            const segmenterConfig: any = {
                runtime: "mediapipe", // or 'tfjs'
                solutionPath: "/selfie_segmentation",
                modelType: "general",
            }

            // load model
            const model =
                bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation
            // create Segmenter
            const segmenter = await bodySegmentation.createSegmenter(
                model,
                segmenterConfig
            )

            setInterval(() => {
                chromaKey(segmenter)
            }, 1000 / 288)
        }

        const chromaKey = async (segmenter: any) => {
            if (
                !typeof webcamRef.current !== undefined &&
                webcamRef.current !== null &&
                webcamRef.current.video.readyState == 4
            ) {
                const video = webcamRef.current.video
                const canvas = canvasRef.current
                const canvas2 = chromaRef.current

                // Set Constants based on Webcam Video
                const videoHeight = video.videoHeight
                const videoWidth = video.videoWidth

                // set video dimensions
                webcamRef.current.video.width = videoWidth
                webcamRef.current.video.height = videoHeight

                // set canvas dimensions
                canvasRef.current.height = videoHeight
                canvasRef.current.width = videoWidth

                // Set chromakey canvas dimensions
                chromaRef.current.height = videoHeight
                chromaRef.current.width = videoWidth

                // Make segmentations
                const person = await segmenter.segmentPeople(video)
                const coloredPartImage = await bodySegmentation.toBinaryMask(
                    person,
                    { r: 0, g: 0, b: 0, a: 0 }, // foreground color is white
                    { r: 0, g: 0, b: 0, a: 255 }, // background is black
                    undefined,
                    0.35 // min. probability to color a pixel as a foreground than backgorund
                )
                const opacity = 1
                const flipHorizontal = false
                const maskBlurAmount = 0.225
                await bodySegmentation.drawMask(
                    canvas,
                    video,
                    coloredPartImage,
                    opacity,
                    maskBlurAmount,
                    flipHorizontal
                )

                // Create context to manipulate RGB Values
                const context = canvas.getContext("2d")
                const context2 = canvas2.getContext("2d")

                // Get frame data from canvas context
                const frame = context.getImageData(
                    0,
                    0,
                    canvas2.width,
                    canvas2.height,
                    { willReadFrequently: true }
                )
                const data = frame.data

                // Remove Black Pixels
                for (let i = 0; i < data.length; i += 4) {
                    const red = data[i + 0]
                    const green = data[i + 1]
                    const blue = data[i + 2]
                    if (green == 0 && red == 0 && blue == 0) {
                        data[i + 3] = 0
                    }
                }

                // Draw pixels from canvas to canvas2
                context2.putImageData(frame, 0, 0)
            }
        }
        loadModel()
    }, [])

    return (
        <>
            <div className="flex h-fit w-fit flex-col items-center justify-center  bg-black">
                <Webcam
                    ref={webcamRef}
                    className=" invisible h-0 w-0"
                    videoConstraints={videoConstraints}
                />
                <canvas ref={canvasRef} className=" invisible h-0 w-0" />

                <div ref={imageRef} className="h-screen w-screen  ">
                    <canvas
                        ref={chromaRef}
                        className="absolute left-[50%] top-[50%] z-20  h-screen -translate-y-[50%] -translate-x-[50%]  bg-transparent"
                    />
                    <img
                        alt="generated image"
                        src={getGenerateImage}
                        className="absolute left-[50%] top-[50%] z-10  h-full  -translate-y-[50%] -translate-x-[50%]  bg-transparent"
                    />
                </div>
                <button
                    type="button"
                    className="absolute left-[70%] top-[50%] z-30 rounded-md bg-red-500 px-5 py-4 text-4xl"
                    onClick={() => {
                        setModalImage()
                        setAppendImage()
                        setIsOpen(true)
                    }}
                >
                    Preview Image
                </button>
                <div ref={appendRef} className="" />
            </div>
            <AlertModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalRef={modalRef}
                saveImage={saveImage}
                removeAppend={clearAppendImage}
            />
        </>
    )
}

export default Camera

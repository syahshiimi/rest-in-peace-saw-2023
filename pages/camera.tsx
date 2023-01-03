import { useEffect, useRef, useState, useCallback } from "react"
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
    const chromaRef = useRef<any>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const appendRef = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false)

    const [devices, setDevices] = useState([])

    const handleDevices = useCallback(
        (mediaDevices: any) =>
            setDevices(
                mediaDevices.filter(({ kind }) => kind === "videoinput")
            ),
        [setDevices]
    )

    // save image function
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
        width: 1080,
        height: 1815,
        windowWidth: 1080,
        windowHHeight: 1920,
        backgroundColor: null,
        removeContainer: true,
    }

    // append image to div
    const setAppendImage = () => {
        html2canvas(imageRef.current, canvasImageConfig).then(function(
            imageRef
        ) {
            appendRef.current.appendChild(imageRef)
        })
    }

    // clear appended image in div
    const clearAppendImage = () => {
        appendRef.current.removeChild(appendRef.current.firstChild)
    }

    // append image to modal portal
    const setModalImage = () => {
        html2canvas(imageRef.current, canvasImageConfig).then(function(
            imageRef
        ) {
            modalRef.current.appendChild(imageRef)
        })
    }

    const saveImage = () => {
        html2canvas(appendRef.current, canvasImageConfig).then(function(
            appendRef
        ) {
            saveAs(appendRef.toDataURL(), "/saw_rip_.png")
        })
    }

    // load the tfjs model
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
        }, 1000 / 144)
    }

    // chromakey model
    const chromaKey = async (segmenter: any) => {
        if (
            !typeof webcamRef.current !== undefined &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState == 4
        ) {
            const webcam = webcamRef.current.video
            const canvas = chromaRef.current

            // Set Constants based on Webcam Video
            const videoHeight = webcam.videoHeight
            const videoWidth = webcam.videoWidth

            // set video dimensions
            webcamRef.current.video.width = videoWidth
            webcamRef.current.video.height = videoHeight

            // Set chromakey canvas dimensions
            chromaRef.current.height = videoHeight
            chromaRef.current.width = videoWidth

            // Make segmentations
            const person = await segmenter.segmentPeople(webcam)
            const coloredPartImage = await bodySegmentation.toBinaryMask(
                person,
                { r: 0, g: 0, b: 0, a: 0 }, // foreground color is white
                { r: 0, g: 0, b: 0, a: 255 }, // background is black
                undefined,
                0.75 // min. probability to color a pixel as a foreground than backgorund
            )
            const opacity = 1
            const flipHorizontal = false
            const maskBlurAmount = 0
            await bodySegmentation.drawMask(
                canvas, // pass canvas to draw
                webcam, // feed video input
                coloredPartImage,
                opacity,
                maskBlurAmount,
                flipHorizontal
            )

            // Create context to manipulate RGB Values
            const context = canvas.getContext("2d")

            // Get frame data from canvas context
            const frame = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
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

            // Draw pixels to canvas context
            context.putImageData(frame, 0, 0)
        }
    }

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices)
        loadModel()
    }, [handleDevices])

    return (
        <>
            <div className="flex min-h-screen min-w-fit flex-col items-center justify-end bg-black pb-4">
                <div className="absolute top-[50%] left-[50%] z-50 -translate-x-[50%] -translate-y-[50%] text-[200px] text-slate-50">
                    <p></p>
                </div>
                {devices.map((device, key) => {
                    return (
                        <Webcam
                            key={devices[0].deviceId | key}
                            ref={webcamRef}
                            className=" invisible h-0 w-0"
                            videoConstraints={{
                                width: 1080,
                                height: 1920,
                                deviceId: device.deviceId,
                            }}
                        />
                    )
                })}
                <div ref={imageRef} className="h-fit w-screen">
                    <canvas
                        ref={chromaRef}
                        className="absolute left-[50%] top-[50%] z-20 max-h-full max-w-full -translate-y-[50%] -translate-x-[50%] bg-transparent"
                    />
                    <img
                        alt="generated image"
                        src={getGenerateImage}
                        className="absolute left-[50%] top-[50%] z-10 h-full w-screen -translate-y-[50%] -translate-x-[50%]  bg-transparent"
                    />
                </div>

                <div className="flex grow flex-row items-end justify-center gap-6 pb-12">
                    <button
                        type="button"
                        className=" z-30 rounded-md bg-blue-500 px-3 py-2  text-2xl font-semibold hover:bg-blue-700"
                        onClick={() => {
                            window.location.reload()
                        }}
                    >
                        RESTART
                    </button>
                    <button
                        type="button"
                        className=" z-30 rounded-md bg-violet-500 px-3 py-2 text-2xl font-semibold hover:bg-violet-700"
                        onClick={() => {
                            setModalImage()
                            setAppendImage()
                            setIsOpen(true)
                            saveImage
                        }}
                    >
                        PREVIEW
                    </button>
                </div>
            </div>
            <div ref={appendRef} />
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

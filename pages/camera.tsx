import { useEffect, useRef } from "react"
import Webcam from "react-webcam"
import * as bodySegmentation from "@tensorflow-models/body-segmentation"
import "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-backend-webgl"
import Image from "next/image"
import html2canvas from "html2canvas"

interface CameraProps {
    getGenerateImage: string | undefined
}

const Camera = ({
    getGenerateImage = "/images/peace-center-2.jpg",
}: CameraProps) => {
    const webcamRef = useRef<any>(null)
    const canvasRef = useRef<any>(null)
    const chromaRef = useRef<any>(null)
    const imageRef = useRef<any>(null)
    const videoConstraints = {
        width: 1000, // actual height (after rotation)
        height: 1920, // actual width (after rotation)
        // aspectRation: 1.777777777777778,
    }

    const getImage = () => {
        html2canvas(document.body).then(function (canvas) {
            document.body.appendChild(canvas)
        })
    }

    useEffect(() => {
        // load bodySegmentation model
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
                    0.9
                )
                const opacity = 1
                const flipHorizontal = false
                const maskBlurAmount = 0.25
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
                    canvas2.height
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
    })

    return (
        <div className="flex max-h-screen flex-col items-center justify-center overflow-hidden">
            {" "}
            <div className="flex max-h-screen flex-col">
                <Webcam
                    ref={webcamRef}
                    className=" invisible h-0 w-0"
                    videoConstraints={videoConstraints}
                />
                <canvas ref={canvasRef} className=" invisible h-0 w-0" />
                <canvas
                    ref={chromaRef}
                    className=" absolute left-[50%] top-[50%] z-20  max-h-screen -translate-y-[50%] -translate-x-[50%]  bg-transparent"
                />
                <img ref={imageRef} className="" />
                <div className="absolute left-[50%] top-[50%] z-10 h-screen w-screen -translate-y-[50%] -translate-x-[50%] overflow-hidden">
                    <Image
                        alt="generated image"
                        src={getGenerateImage}
                        style={{ objectFit: "cover" }}
                        fill={true}
                    />
                </div>
                <button
                    type="button"
                    className="absolute left-[70%] top-[50%] z-30 rounded-md bg-red-500 px-5 py-4 text-4xl"
                    onClick={getImage}
                >
                    Get Image!
                </button>
            </div>
            {/* <button
                className="absolute top-[5%] bg-red-500"
                // onClick={loadModel}
            >
                Get Model
            </button> */}
        </div>
    )
}

export default Camera

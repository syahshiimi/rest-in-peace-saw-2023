import { useEffect, useRef } from "react"
import Webcam from "react-webcam"
import * as bodySegmentation from "@tensorflow-models/body-segmentation"
import "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-backend-webgl"
import Image from "next/image"

interface CameraProps {
    getGenerateImage: string | undefined
    startWebcam: boolean | string | undefined
}

const Camera = ({
    getGenerateImage = "/images/peace-center-2.jpg",
    startWebcam = false,
}: CameraProps) => {
    const webcamRef = useRef<any>(null)
    const canvasRef = useRef<any>(null)
    const chromaRef = useRef<any>(null)
    const videoConstraints = {
        width: { min: 1280 },
        height: { min: 640 },
        aspectRation: 1.777777777777778,
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
            const model = await bodySegmentation.SupportedModels
                .MediaPipeSelfieSegmentation
            // create Segmenter
            const segmenter = await bodySegmentation.createSegmenter(
                model,
                segmenterConfig
            )

            setInterval(() => {
                chromaKey(segmenter)
            }, 1000 / 74)
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
                    undefined,
                    undefined,
                    undefined,
                    0.63
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
    }, [])
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            {" "}
            <div className="flex flex-col">
                <Webcam
                    ref={webcamRef}
                    className=" invisible h-0 w-0"
                    videoConstraints={videoConstraints}
                />
                <canvas ref={canvasRef} className=" invisible  h-0 w-0" />
                <canvas
                    ref={chromaRef}
                    className="absolute left-[50%] top-[50%] z-20 -translate-y-[50%]  -translate-x-[50%]  bg-transparent"
                />
                <div className="absolute left-[50%] top-[50%] z-10 h-[640px]  w-[1280px] -translate-y-[50%] -translate-x-[50%]">
                    <Image
                        alt="generated image"
                        src={getGenerateImage}
                        style={{ objectFit: "cover" }}
                        fill={true}
                    />
                </div>
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

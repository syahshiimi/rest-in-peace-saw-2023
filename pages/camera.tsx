import { useEffect, useRef } from "react"
import Webcam from "react-webcam"
import * as bodySegmentation from "@tensorflow-models/body-segmentation"
import "@tensorflow/tfjs-backend-webgl"
import Image from "next/image"

interface CameraProps {
    getGenerateImage: string | undefined
}

const Camera = ({
    getGenerateImage = "/images/test_image.png",
}: CameraProps) => {
    const webcamRef = useRef<any>(null)
    const canvasRef = useRef<any>(null)
    const chromaRef = useRef<any>(null)

    // load bodySegmentation model
    const loadModel = async () => {
        const segmenterConfig: any = {
            runtime: "mediapipe", // or 'tfjs'
            solutionPath:
                "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
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
        }, 1000 / 60)
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

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-yellow-500">
            <div className=" flex flex-row ">
                {" "}
                <Webcam ref={webcamRef} className=" basis-1/4" />
                <canvas ref={canvasRef} className=" basis-1/4" />
                <canvas
                    ref={chromaRef}
                    className={` absolute left-[60%] z-20 basis-1/4 bg-transparent bg-cover `}
                />
                <div className="absolute left-[60%] z-10 max-h-[480px] max-w-[640px] basis-1/4">
                    <Image
                        alt="generated image"
                        src={getGenerateImage}
                        className="bg-contain"
                        width={512}
                        height={512}
                    />
                </div>
            </div>
            <button className="bg-red-500" onClick={loadModel}>
                Get Model
            </button>
        </div>
    )
}

export default Camera

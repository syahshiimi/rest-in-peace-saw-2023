import { useRef } from "react"
import { NextPage } from "next"
import Webcam from "react-webcam"
import * as bodySegmentation from "@tensorflow-models/body-segmentation"
import "@tensorflow/tfjs-backend-webgl"

const Camera: NextPage = () => {
    const webcamRef = useRef<any>(null)
    const canvasRef = useRef<any>(null)

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

        console.log("Segmenter loaded!")

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
            const videoHeight = video.videoHeight
            const videoWidth = video.videoWidth

            // set video dimensions
            webcamRef.current.video.width = videoWidth
            webcamRef.current.video.height = videoHeight

            // set canvas dimensions
            const canvas = canvasRef.current
            canvasRef.current.height = videoHeight
            canvasRef.current.width = videoWidth

            // Make segmentations
            const person = await segmenter.segmentPeople(video)

            const foregroundThreshold = 0.5
            const backgroundBlurAmount = 5
            const edgeBlurAmount = 3
            const flipHorizontal = false

            await bodySegmentation.drawBokehEffect(
                canvas,
                video,
                person,
                foregroundThreshold,
                backgroundBlurAmount,
                edgeBlurAmount,
                flipHorizontal
            )
        }
    }

    console.log(canvasRef)
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Webcam ref={webcamRef} className="h-[480px] w-[640px]" />
            <canvas ref={canvasRef} className="h-[480px] w-[640px]" />
            <button className="bg-red-500" onClick={loadModel}>
                Get Model
            </button>
        </div>
    )
}

export default Camera

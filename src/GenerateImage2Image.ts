// import { type GenerateImage2ImageProps } from "../types/GenerateImage2ImageProps"
import { Dispatch, SetStateAction, useState } from "react"

export interface payloadProps {
    init_images: string[] | undefined
    include_init_images: boolean | undefined
    denoising_strength: number | undefined
    steps: number | undefined
    cfg_scale: number | undefined
    prompt: string | undefined
}

const errorReload = (error: unknown) => {
    if (error) {
        // alert(`Error: ${error}`)
        window.location.reload()
    }
}

export default function GenerateImage2Image(
    payload: payloadProps,
    setStableImage: Dispatch<SetStateAction<payloadProps>>
) {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify(payload),
    }

    fetch("http://127.0.0.1:7860/sdapi/v1/img2img", options)
        .then((response) => response.json())
        .then((response) => setStableImage(response))
        .catch((error) => errorReload(error))
}

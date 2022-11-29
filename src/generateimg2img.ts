import { Dispatch, SetStateAction } from "react"
import { type GenerateImage2ImageProps } from "../types/GenerateImage2ImageProps"

export default function GenerateImage2Image({
    payload,
    setData,
}: GenerateImage2ImageProps) {
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

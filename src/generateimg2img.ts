import { type GenerateImage2ImageProps } from "../types/GenerateImage2ImageProps"

export default function GenerateImage2Image(payload: any, setStableImage: any) {
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
}

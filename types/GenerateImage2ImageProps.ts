import { Dispatch, SetStateAction } from "react"

export interface GenerateImage2ImageProps {
    setStableImage: () => void
    payload: {
        init_images: string[] | undefined
        include_init_images: boolean | undefined
        denoising_strength: number | undefined
        steps: number | undefined
        cfg_scale: number | undefined
        prompt: string | undefined
    }
}

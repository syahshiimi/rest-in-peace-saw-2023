import { Dispatch, SetStateAction } from "react"
export interface GenerateImage2ImageProps {
    setData: Dispatch<SetStateAction<any>>
    payload: {
        init_images: object[] | undefined
        include_init_images: boolean | undefined
        denoising_strength: number | undefined
        steps: number | undefined
        cfg_scale: number | undefined
        prompt: string | undefined
    }
}

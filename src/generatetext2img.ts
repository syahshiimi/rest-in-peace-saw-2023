export default function GenerateText2Image() {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accept: "application/json",
        },
        body: '{"enable_hr":false,"denoising_strength":0,"firstphase_width":0,"firstphase_height":0,"prompt":"hotpot chicken","styles":["string"],"seed":-1,"subseed":-1,"subseed_strength":0,"seed_resize_from_h":-1,"seed_resize_from_w":-1,"sampler_name":"string","batch_size":1,"n_iter":1,"steps":50,"cfg_scale":7,"width":512,"height":512,"restore_faces":false,"tiling":false,"negative_prompt":"string","eta":0,"s_churn":0,"s_tmax":0,"s_tmin":0,"s_noise":1,"override_settings":{},"sampler_index":"Euler"}',
    }

    fetch("http://localhost:7860/sdapi/v1/txt2img", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err))
}

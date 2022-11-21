export default async function postData() {
    const response = await fetch(`http://localhost:7860/sdapi/v1/txt2img`, {
        method: 'POST',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Vary': 'Accept-Encoding',
            'Access-Control-Allow-Origin': 'http://localhost:7860/sdapi/v1/txt2img',
            'Content-Encoding': 'gzip',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            'Access-Control-Allow-Headers': 'Accept, Accept-Version, Content-Type, Vary, Access-Control-Allow-Origin, Contennt-Encoding'
        },
        body: '{"enable_hr":false,"denoising_strength":0,"firstphase_width":0,"firstphase_height":0,"prompt":"a group of chickens playing hopscotch","styles":["string"],"seed":-1,"subseed":-1,"subseed_strength":0,"seed_resize_from_h":-1,"seed_resize_from_w":-1,"batch_size":1,"n_iter":1,"steps":50,"cfg_scale":7,"width":512,"height":512,"restore_faces":false,"tiling":false,"negative_prompt":"string","eta":0,"s_churn":0,"s_tmax":0,"s_tmin":0,"s_noise":1,"override_settings":{},"sampler_index":"Euler"}',
    })
    return response.json();
}
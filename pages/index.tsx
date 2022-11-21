import { ReactNode } from "react";
import NextCors from "nextjs-cors"

type QuestionButtonProps = {
  children: ReactNode;
};
const QuestionButton = ({ children }: QuestionButtonProps) => {
  return (
    <button className="flex flex-row justify-center rounded-2xl bg-slate-500 px-4 py-4 text-slate-300 shadow-lg">
      {children}
    </button>
  );
};

type QuestionOneProps = {
  children?: ReactNode;
};

const QuestionOne = ({ children }: QuestionOneProps) => {
  async function postData() {
    const response = await fetch(`/api/example`, {
      method: 'OPTIONS',
      mode: 'cors',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Vary': 'Accept-Encoding',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Content-Encoding': 'gzip',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'Accept, Accept-Version, Content-Type, Vary, Access-Control-Allow-Origin, Contennt-Encoding'
      },
      body: '{"enable_hr":false,"denoising_strength":0,"firstphase_width":0,"firstphase_height":0,"prompt":"a group of chickens playing hopscotch","styles":["string"],"seed":-1,"subseed":-1,"subseed_strength":0,"seed_resize_from_h":-1,"seed_resize_from_w":-1,"batch_size":1,"n_iter":1,"steps":50,"cfg_scale":7,"width":512,"height":512,"restore_faces":false,"tiling":false,"negative_prompt":"string","eta":0,"s_churn":0,"s_tmax":0,"s_tmin":0,"s_noise":1,"override_settings":{},"sampler_index":"Euler"}',
    })
    const data = response.json();
    console.log(data)
    return data;
  }

  // const fetchData = async () => {
  //   const response = await fetch('/api/example', {
  //     method: 'POST',
  //     // mode: 'no-cors',
  //     headers: {
  //       'content-type': 'application/json',
  //       'accept': 'application/json',
  //       'vary': 'Accept-Encoding',
  //       'Access-Control-Allow-Origin': 'https://localhost:3000',
  //       'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  //       'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  //     },
  //     body: '{"enable_hr":false,"denoising_strength":0,"firstphase_width":0,"firstphase_height":0,"prompt":"a group of chickens playing hopscotch","styles":["string"],"seed":-1,"subseed":-1,"subseed_strength":0,"seed_resize_from_h":-1,"seed_resize_from_w":-1,"batch_size":1,"n_iter":1,"steps":50,"cfg_scale":7,"width":512,"height":512,"restore_faces":false,"tiling":false,"negative_prompt":"string","eta":0,"s_churn":0,"s_tmax":0,"s_tmin":0,"s_noise":1,"override_settings":{},"sampler_index":"Euler"}',
  //   })
  //   const data = await response.json();
  //   console.log(data)
  // }



  return (
    <div>
      <div className="pb-8 text-7xl font-bold">Question #1:</div>
      <h2 className="text-4xl font-semibold">
        We’d like to know more about you before we begin.
        <br />
        <br />
        <i className="text-3xl tracking-tight">
          What is your relationship with Peace Center?
        </i>
        <div className="grid grid-cols-2 gap-4 pt-8">
          <div onClick={() => postData()}>
            <QuestionButton>I visit it frequently.</QuestionButton>
          </div>
          <QuestionButton>I visit it occassionally.</QuestionButton>
          <QuestionButton>I visit it rarely.</QuestionButton>
        </div>
      </h2>
    </div>
  );
};
export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <QuestionOne />
    </div>
  );
}

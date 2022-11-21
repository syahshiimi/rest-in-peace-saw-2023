import { ReactNode, useEffect, useState } from "react";
import useSWR from 'swr'

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



export default function Home() {


  function postData() {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: '{"enable_hr":false,"denoising_strength":0,"firstphase_width":0,"firstphase_height":0,"prompt":"hotpot chicken","styles":["string"],"seed":-1,"subseed":-1,"subseed_strength":0,"seed_resize_from_h":-1,"seed_resize_from_w":-1,"sampler_name":"string","batch_size":1,"n_iter":1,"steps":50,"cfg_scale":7,"width":512,"height":512,"restore_faces":false,"tiling":false,"negative_prompt":"string","eta":0,"s_churn":0,"s_tmax":0,"s_tmin":0,"s_noise":1,"override_settings":{},"sampler_index":"Euler"}'
    };

    fetch('http://localhost:7860/sdapi/v1/txt2img', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }



  return (
    <div className="flex h-screen flex-col items-center justify-center">
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
        </h2 >
      </div >

    </div>
  );
}

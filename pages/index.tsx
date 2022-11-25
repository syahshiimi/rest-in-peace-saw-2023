import { ReactNode, useState } from "react";
import QuestionButton from "../components/questionButton";
import Image from 'next/image'


const QuestionOne = () => {

  const [data, setData] = useState<any>()

  const payload = {
    "prompt": 'faded and grainy wide angle shot of a vintage 80s interior, futuristic, soft and dreamy lighting, cyberpunk 2077 aesthetic'
  }

  function GenerateImage() {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(payload)
    };

    fetch('http://localhost:7860/sdapi/v1/txt2img', options)
      .then(response => response.json())
      .then(response => setData(response))
      .then(response => console.log(response))
  }

  return (
    <>
      <div className="pb-8 text-7xl font-bold">Question #1:</div>
      <h2 className="text-4xl font-semibold">
        We’d like to know more about you before we begin.
        <br />
        <br />
        <i className="text-3xl tracking-tight">
          What is your relationship with Peace Center?
        </i>
        <div className="grid grid-cols-2 gap-4 pt-8">
          <QuestionButton postData={GenerateImage}>I visit it frequently.</QuestionButton>
          <QuestionButton>I visit it occassionally.</QuestionButton>
          <QuestionButton>I visit it rarely.</QuestionButton>
        </div>
        <div className="w-[250px]">
          {
            (!data) ? null || undefined : <Image src={`data:image/png;base64, ${data?.images}`} alt="SD image" width={512} height={512} />
          }
        </div>
      </h2 >
    </>
  )
}

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <QuestionOne />
    </div>
  );
}

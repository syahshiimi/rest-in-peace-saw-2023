import { ReactNode } from "react";
import QuestionButton from "../components/questionButton";
import GenerateImage from "../src/generateImage";


interface QuestionOneProps {
  children?: ReactNode;
};


const QuestionOne = ({ children }: QuestionOneProps) => {

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

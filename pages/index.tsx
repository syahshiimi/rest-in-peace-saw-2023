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
          <div >
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

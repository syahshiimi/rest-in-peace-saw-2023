import { ReactNode } from "react"

type QuestionButtonProps = {
  children: ReactNode
}
const QuestionButton = ({ children }: QuestionButtonProps) => {
  return (
    <button
      className="flex flex-row justify-center bg-slate-500 px-4 py-4 rounded-2xl shadow-lg text-slate-300">
      {children}
    </button>

  )
}

type QuestionOneProps = {
  children?: ReactNode
}

const QuestionOne = ({ children }: QuestionOneProps) => {
  return (
    <div>
      <div className="font-bold text-7xl pb-8">
        Question #1:
      </div>
      <h2 className="text-4xl font-semibold">
        We’d like to know more about you before we begin.
        <br />
        <br />
        <i className="text-3xl tracking-tight">
          What is your relationship with Peace Center?
        </i>
        <div className="grid grid-cols-2 gap-4 pt-8">
          <QuestionButton>
            I visit it frequently.
          </QuestionButton>
          <QuestionButton>
            I visit it occassionally.
          </QuestionButton>
          <QuestionButton>
            I visit it rarely.
          </QuestionButton>
        </div>
      </h2>
    </div>

  )
}
export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <QuestionOne />
    </div>

  )
}

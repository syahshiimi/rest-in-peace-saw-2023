import { ReactNode } from "react";

type QuestionButtonProps = {
  children?: ReactNode;
  postData?: () => void;
};

const QuestionButton = ({ children, postData }: QuestionButtonProps) => {
  return (
    <button
      className="flex flex-row justify-center rounded-2xl bg-slate-500 px-4 py-4 text-slate-300 shadow-lg"
      onClick={postData}
    >
      {children}
    </button>
  );
};

export default QuestionButton;

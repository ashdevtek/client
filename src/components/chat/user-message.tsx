import { User2Icon } from "lucide-react";
import React from "react";

interface Props {
  text: string;
}

const UserMessage: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex items-start mb-4">
      <div className="flex-none w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <User2Icon className="m-[8px]" />
      </div>
      <div className="ml-3 py-2 px-4">{text}</div>
    </div>
  );
};

export default UserMessage
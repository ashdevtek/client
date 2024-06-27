import { User } from "lucide-react";
import React from "react";

interface Props {
  text: string;
}

const UserMessage: React.FC<Props> = ({ text }) => {
  return (
      <div className="flex items-start mb-4">
        <div className="flex-none w-10 h-10  border rounded-full flex items-center justify-center dark:border-white">
          <User className="m-[8px]  dark:bg-black" />
        </div>
        <div className="ml-3 py-2 px-4">{text}</div>
      </div>
  );
};

export default UserMessage;

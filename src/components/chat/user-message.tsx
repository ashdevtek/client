import { User2Icon } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";

interface Props {
  text: string;
}

const UserMessage: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <div className="flex items-start mb-4">
        <div className="flex-none w-10 h-10  border rounded-full flex items-center justify-center">
          <User2Icon className="m-[8px]" />
        </div>
        <div className="ml-3 py-2 px-4">{text}</div>
      </div>
      <Separator className="my-2" />
    </div>
  );
};

export default UserMessage;

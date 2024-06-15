import { BotIcon } from "lucide-react";
import React from "react";

interface Props {
  text?: string;
  loading: boolean;
}

const BotMessage: React.FC<Props> = ({ text, loading }) => {
  return (
    <div className="flex items-start mb-4">
      <div className="flex-none w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <BotIcon className="m-[8px]" />
      </div>
      {loading ? (
        <div className="ml-3 py-2">
          <div className="animate-pulse bg-gray-300 h-6 w-20 rounded"></div>
        </div>
      ) : (
        <div className="ml-3 py-2 px-4">{text}</div>
      )}
    </div>
  );
};

export default BotMessage;

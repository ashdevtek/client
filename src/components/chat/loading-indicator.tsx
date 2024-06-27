import React from "react";
import { BotIcon } from "lucide-react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start mb-4">
      <div className="flex-none w-10 h-10 rounded-full border flex items-center justify-center dark:bg-white">
        <img src="/icon_dark.svg" className="m-[8px]" />
      </div>
      <div className="ml-3 pt-5 flex space-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full bg-red-500 animate-[fadeInAndOut_1.5s_ease-in-out_infinite]`}
            style={{ animationDelay: `${index * 0.2}s` }} // Stagger the animations
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingIndicator;

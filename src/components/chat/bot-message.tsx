import { BotIcon, Ghost } from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { link } from "fs";

interface Props {
  text: string;
  loading: boolean;
}

const BotMessage: React.FC<Props> = ({ text, loading }) => {
  return (
    <div>
      <div className="flex items-start mb-4">
        <div className="flex-none w-10 h-10 rounded-full border flex items-center justify-center">
          <BotIcon className="m-[8px]" />
        </div>
        <div className="ml-3 py-2 px-4">
          {text}
          {loading && (
            <div className="ml-2 pt-1 inline-block">
              <div className="animate-pulse bg-gray-300 h-4 w-12 rounded"></div>
            </div>
          )}
        </div>
      </div>
      {!loading && (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <AccordionTrigger><Button className="flex justify-end mt-0" variant="link">View source</Button></AccordionTrigger>
            </AccordionTrigger>
            <AccordionContent>Source 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default BotMessage;

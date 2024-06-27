import { BotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchAICitations, ApiResponse, Citation } from "@/lib/chat";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";

interface Props {
  text: string;
  userMessage: string;
  loading: boolean;
  onCitationClick: (filePath: string, pageLabel: string) => void;
}

const BotMessage: React.FC<Props> = ({
  text,
  userMessage,
  loading,
  onCitationClick,
}) => {
  const [citations, setCitations] = useState<Citation[]>([]);

  useEffect(() => {
    const fetchCitations = async () => {
      try {
        const response: ApiResponse = await fetchAICitations(userMessage);
        if (response.citation && response.citation.length > 0) {
          setCitations(response.citation);
        }
      } catch (error) {
        console.error("Error fetching citations:", error);
      }
    };
    if (!loading) {
      fetchCitations();
    }
  }, [onCitationClick]);

  const handleCitationClick = (filePath: string, pageLabel: string) => {
    onCitationClick(filePath, pageLabel);
  };
  return (
    <div>
      <div className="flex items-start mb-4">
        <div className="flex-none w-10 h-10 rounded-full border flex items-center justify-center dark:border-white">
          <img
            src="/icon_light.svg"
            className="hidden dark:block m-[8px]"
          />
          <img
            src="/icon_dark.svg"
            className="block dark:hidden m-[8px]"
          />
        </div>
        <div className="ml-3 py-2 px-4">
          {text}
          {loading && (
            <div className="ml-2 inline-block w-1 h-5 bg-gray-500 animate-blink" />
          )}
        </div>
      </div>
      {citations && citations.length > 0 && !loading && (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Button className="flex justify-end mt-0" variant="link">
                <p className="text-black dark:text-white">View source</p>
              </Button>
            </AccordionTrigger>
            <AccordionContent>
              {citations.map((citation, index) => (
                <div key={index}>
                  <Button
                    variant="link"
                    className="truncate"
                    onClick={() => {
                      handleCitationClick(
                        citation.file_path,
                        citation.page_label
                      );
                    }}
                  >
                    {index + 1}. {citation.file_name}, P:{citation.page_label}
                  </Button>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default BotMessage;

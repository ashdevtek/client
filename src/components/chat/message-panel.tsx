import React, {
  ChangeEvent,
  FormEvent,
  forwardRef,
  TextareaHTMLAttributes,
} from "react";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Button } from "../ui/button";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  disabled: boolean;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessagePanel = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, disabled, onChange, onSubmit }, ref) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // Check if the Enter key (key code 13) was pressed
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevent default behavior (e.g., new line)
        onSubmit(e as FormEvent); // Trigger form submission
      }
    };
    return (
      <form
        className="w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
        onSubmit={onSubmit}
      >
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          ref={ref}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center p-3 pt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    );
  }
);

export default MessagePanel;

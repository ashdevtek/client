import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Message } from "./chat";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const updateBotMessage = (
  messages: Message[],
  newText: string
): Message[] => {
  const lastMessage = messages[messages.length - 1];
  return lastMessage?.sender === "bot"
    ? [
        ...messages.slice(0, -1),
        { ...lastMessage, text: lastMessage.text + newText },
      ]
    : [...messages, { text: newText, sender: "bot" }];
};

export const hasReceivedFirstChunk = (messages: Message[]): boolean => {
  return messages.some((message) => message.sender === "bot" && message.text !== "");
};

export const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};
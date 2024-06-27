"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import config from "../../../config/config.json";
import MessagePanel from "./message-panel";
import { fetchAIResponse, Message } from "@/lib/chat";
import WelcomeScreen from "./welcome-screen";
import UserMessage from "./user-message";
import BotMessage from "./bot-message";
import LoadingIndicator from "./loading-indicator";
import { scrollToBottom, updateBotMessage } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface ChatPanelProps {
  onCitationClick: (filePath: string, pageLabel: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onCitationClick }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastBotMessageRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    return onSubmit(inputValue);
  };

  const hasReceivedFirstChunk = messages.some(
    (message) => message.sender === "bot" && message.text !== ""
  );

  const onSubmit = async (inputValue: string) => {
    if (inputValue.trim() === "") return;

    // Set loading to true immediately when user submits message
    setLoading(true);

    // Add user message to messages state
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input value
    setInputValue("");

    try {
      const stream = await fetchAIResponse(inputValue, "streaming");
      if (!stream) {
        throw new Error("Stream is empty");
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let allChunksReceived = false;
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          allChunksReceived = true;
          break;
        }

        let chunk = decoder.decode(value, { stream: true }); // Decode the chunk

        // Check if the chunk indicates the end of the stream
        if (chunk.includes("[DONE]")) {
          chunk = chunk.replace("[DONE]", "");
          reader.cancel(); // Signal the end of the stream
          allChunksReceived = true;
        }

        // Introduce a delay before processing each chunk
        if (!allChunksReceived) {
          await new Promise((resolve) =>
            setTimeout(resolve, config.debounce_delay)
          );
        }

        // Update accumulated text in BotMessage state after receiving server response
        setMessages((prevMessages) => {
          const updatedMessages = updateBotMessage(prevMessages, chunk);
          // Check if citations exist for the latest bot message
          if (
            updatedMessages.length > prevMessages.length &&
            updatedMessages[updatedMessages.length - 1].sender === "bot"
          ) {
            const botMessage = updatedMessages[updatedMessages.length - 1].text;
          }
          return updatedMessages;
        });
      }

      // Set loading to false after receiving server response or encountering an error
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Set loading to false after receiving server response or encountering an error
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
    }

    scrollToBottom(lastBotMessageRef);
  }, [messages]);

  return (
    <div className="w-1/2 flex flex-col rounded-xl bg-muted/50 m-4">
      <div className="flex-1 overflow-auto p-4">
        <div className="h-full">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="flex flex-col space-y-2">
              {messages.map((message, index) => (
                <>
                  <React.Fragment key={index}>
                    {message.sender === "user" ? (
                      <UserMessage text={message.text} />
                    ) : (
                      <div
                        ref={
                          index === messages.length - 1
                            ? lastBotMessageRef
                            : null
                        }
                      >
                        <BotMessage
                          key={message.text}
                          text={message.text}
                          userMessage={message.text}
                          loading={loading && index === messages.length - 1}
                          onCitationClick={onCitationClick}
                        />
                      </div>
                    )}
                  </React.Fragment>
                  <Separator />
                </>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
          {!hasReceivedFirstChunk && loading && <LoadingIndicator />}
          <div className="grid grid-cols-2 mt-48 px-4 gap-2">
            {messages.length === 0 &&
              config.exampleMessages.map((example, index) => (
                <div
                  key={example.heading}
                  className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                    index > 1 && "hidden md:block"
                  }`}
                  onClick={() => onSubmit(example.message)}
                >
                  <div className="text-sm font-semibold">{example.heading}</div>
                  <div className="text-sm text-zinc-600">
                    {example.subheading}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <MessagePanel
          ref={inputRef}
          value={inputValue}
          disabled={loading}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ChatPanel;

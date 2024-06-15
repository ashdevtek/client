"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Share } from "lucide-react";
import MessagePanel from "./message-panel";
import WelcomeScreen from "./welcome-screen";
import UserMessage from "./user-message";
import BotMessage from "./bot-message";
import { Separator } from "../ui/separator";

interface Message {
  text: string;
  sender: string;
}

const Chat = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  interface RestResponse {
    status: number;
    message: string;
  }

  async function mockRestResponse(message: string): Promise<RestResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response: RestResponse = {
      status: 200,
      message: `server response for: ${message}`,
    };
    return response;
  }

  async function fetchAIResponse(query: string): Promise<RestResponse> {
    const url = `https://api-docusage.devoptek.ai/nonstreaming/ask?query=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        // mode: "no-cors",
        body: "",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();

      return {
        status: response.status,
        message: data,
      };
    } catch (error) {
      console.error("Error fetching data from endpoint:", error);
      throw error;
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;

    // Set loading to true immediately when user submits message
    setLoading(true);

    // Add user message to messages state
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input value
    setInputValue("");

    try {
      // Simulate server response delay
      // const response = await mockRestResponse(inputValue);

      const response = await fetchAIResponse(inputValue);

      // Add bot message to messages state after receiving server response
      const botMessage = { text: response.message, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Set loading to false after receiving server response or encountering an error
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
      <div className="flex justify-end p-4">
        <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
          <Share className="size-3.5" />
          Share
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="flex flex-col space-y-2">
            {messages.map((message, index) => (
              <React.Fragment key={index}>
                {message.sender === "user" ? (
                  <UserMessage text={message.text} />
                ) : (
                  <BotMessage
                    text={message.text}
                    loading={loading && index === messages.length - 1}
                  />
                )}
                <Separator className="mb-4" />
              </React.Fragment>
            ))}

            {loading && (
              <div>
                <BotMessage loading={loading} />
                <Separator className="mb-4" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center p-4">
        <MessagePanel
          value={inputValue}
          disabled={loading}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Chat;

"use client";

import React, { useState } from "react";
import ChatPanel from "@/components/chat/chat-panel";
import Preview from "@/components/preview/preview";
import { ToggleTheme } from "@/components/themes/toggle-theme";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export default function Home() {
  const [pdfUrl, setPdfUrl] = useState<string>("./data/Docusage.pdf"); // default document to load when the app starts
  const [pdfPageNumber, setPdfPageNumber] = useState<string>("0");

  const handleCitationClick = (filePath: string, pageLabel: string) => {
    setPdfUrl(filePath);
    setPdfPageNumber(pageLabel);
  };

  return (
    <div className="flex h-screen pl-[52px]">
      <div className="w-1/2 h-full bg-gray-200 m-2">
        <Preview pdfUrl={pdfUrl} pdfPageNumber={pdfPageNumber} />
      </div>
      <ChatPanel onCitationClick={handleCitationClick} />
    </div>
  );
}

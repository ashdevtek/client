import ChatPanel from "@/components/chat/chat-panel";
import Preview from "@/components/preview/preview";
import { ToggleTheme } from "@/components/themes/toggle-theme";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full pl-[52px]">
      <div className="sticky top-0 z-10 flex h-[57px] justify-between items-center gap-1 border-b bg-blue-200 dark:bg-slate-950 px-4">
        <h1 className="text-xl font-semibold">Docusage</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="p-2 hover:border-2 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white">
            <Share className="size-5" />
          </Button>
          <ToggleTheme />
        </div>
      </div>
      <div className="flex h-[calc(100vh-52px)] md:flex-col">
        <div className="flex h-full">
          <div className="w-1/2 overflow-auto p-4">
            <Preview />
          </div>
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}

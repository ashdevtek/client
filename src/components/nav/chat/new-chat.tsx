import GenericDialog from "@/components/ui/custom-dialog";
import React, { useEffect, useRef, useState } from "react";
import SidebarTooltip from "../sidebar-tooltip";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import { MessageSquareDiff } from "lucide-react";

const NewChat = () => {
  const [open, setOpen] = useState(false);const handleNewChat = () => {
    const newChatId = uuidv4();
    // Initialize a new chat session with the newChatId
    console.log("New Chat ID:", newChatId);
    // Redirect to the chat page or update the state to start the new chat
  };

  return (
    <GenericDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <SidebarTooltip content="New chat">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg fill-foreground hover:border-2 hover:border-red-500 hover:text-red-600 dark:hover:text-white"
          >
            <MessageSquareDiff className="size-5" />
          </Button>
        </SidebarTooltip>
      }
    >
      <div className="w-full max-w-md mx-auto space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">New Chat</h2>
          <p className="text-muted-foreground my-5">
          Ready to start a fresh conversation? Let's begin a new chat session.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleNewChat}>Create</Button>
        </div>
      </div>
    </GenericDialog>
  );
};

export default NewChat;

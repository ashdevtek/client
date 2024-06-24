"use client";

import React from "react";
import SidebarButton from "./sidebar-button";
import { BookOpenText, CircleHelp, MessageSquareDiff } from "lucide-react";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import UserProfile from "./user/user-profile";
import Settings from "./settings/settings";
import NewChat from "./chat/new-chat";

interface SidebarProps {
  session: Session | null;
}

const SidebarDesktop = ({ session }: SidebarProps) => {
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <img
            src="/icon_light.svg"
            className="hidden dark:block size-5 fill-foreground"
          />
          <img
            src="/icon_dark.svg"
            className="block dark:hidden size-5 fill-foreground"
          />
        </Button>
      </div>
      <nav className="grid gap-2 p-2 my-5">
        <NewChat />
        <SidebarButton icon={BookOpenText} link="/">
          Chat history
        </SidebarButton>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Settings />
        <SidebarButton icon={CircleHelp} link="/">
          Help
        </SidebarButton>
        <UserProfile session={session} />
      </nav>
    </aside>
  );
};

export default SidebarDesktop;

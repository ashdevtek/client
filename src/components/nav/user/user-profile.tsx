import { Session } from "next-auth";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { CircleUserRound } from "lucide-react";
import UserCard from "./user-card";
import LoginButton from "../../login/login-button";
import SidebarTooltip from "../sidebar-tooltip";

interface UserProfileProps {
  session: Session | null;
}

const UserProfile = ({ session }: UserProfileProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <SidebarTooltip content='My profile'>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg fill-foreground hover:border-2 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white"
        >
          <CircleUserRound className="size-5" />
        </Button>
      </DialogTrigger>
      </SidebarTooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="grid gap-2 text-left">
              <h1 className="text-xl font-bold mb-5">
                {session?.user ? "My profile" : "Login"}
              </h1>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-4 text-center text-sm">
            {session?.user ? (
              <div>
                <UserCard session={session} />
                <LoginButton>Sign in as a different user</LoginButton>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="text-left text-sm text-gray-500 dark:text-gray-400 mb-5">
                  Ready to roll? Sign in pronto – no sign-up hassle here!
                </div>
                <LoginButton>Sign in with Google</LoginButton>
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;

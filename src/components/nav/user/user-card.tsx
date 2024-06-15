import { Session } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface UserProps {
  session: Session | null;
}

const UserCard = ({ session }: UserProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-10">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col justify-center items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  session?.user?.image ? session.user.image : "/new_user.svg"
                }
              />
              <AvatarFallback> {session?.user?.name} </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 mt-3 items-center text-left">
              <div className="font-semibold text-lg">{session?.user?.name}</div>
              <div className="text-sm">{session?.user?.email}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <p className="text-2xl font-bold">42</p>
          <p className="text-gray-500">Uploads</p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">12</p>
          <p className="text-gray-500 ">Chats</p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">3</p>
          <p className="text-gray-500">shares</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

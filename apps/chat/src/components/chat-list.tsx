import { Avatar, AvatarImage, AvatarFallback } from "@vim/ui/primitives/avatar";
import type { Message } from "../models/message";
import { Pin } from "lucide-react";
import { Badge } from "@vim/ui/primitives/badge";
import type { User } from "../models/user";
import { SearchBar } from "@vim/ui/search-bar";

export function ChatList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-1/4 border-r bg-background">
      <SearchBar className="m-4" />
      {children}
    </div>
  );
}

export interface ChatProps {
  user: User;
  lastMessage?: Message;
  unread: number;
  pinned: boolean;
}

export function Chat({
  user,
  lastMessage,
  unread = 0,
  pinned = false,
}: ChatProps) {
  return (
    <div className="flex p-4 bg-background cursor-default hover:bg-accent rounded-md items-center gap-4">
      <Avatar className="place-self-start">
        <AvatarImage src={user.imageUrl ?? ""} />
        <AvatarFallback>
          {user.name
            .split(" ")
            .map((e) => e.slice(0, 1))
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex w-full">
        <div className="flex flex-col flex-grow">
          <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
            {user.name}
          </h4>
          <p className="text-muted-foreground text-xs">
            {lastMessage?.content ?? "Fallback Message Content"}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            {lastMessage?.sentAt.toString() ?? "10:00"}
          </p>
          <div className="flex justify-center items-center gap-2">
            {pinned && (
              <Pin className="text-muted-foreground rotate-90" size={16} />
            )}
            {unread > 0 && <Badge>{unread}</Badge>}
          </div>
        </div>
      </div>
    </div>
  );
}

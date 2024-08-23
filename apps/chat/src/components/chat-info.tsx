import { Avatar, AvatarFallback, AvatarImage } from "@vim/ui/primitives/avatar";
import type { User } from "../models/user";
import { SearchBarWithButton } from "@vim/ui/search-bar";

export function ChatInfoBar({
  user,
}: {
  user: User;
}) {
  return (
    <div className="flex items-center justify-between bg-background shadow-md w-full h-[60px]">
      <div className="cursor-default active:bg-accent active:text-accent-foreground flex items-center gap-4 px-4">
        <Avatar>
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((e) => e.slice(0, 1))
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h3 className="scroll-m-20 text-md font-semibold tracking-tight">
            {user.name}
          </h3>
          {user.online && (
            <p className="text-muted-foreground text-xs">Online</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 px-4">
        <SearchBarWithButton />
      </div>
    </div>
  );
}

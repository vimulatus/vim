export function ChatList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full w-1/4 border-r-2">{children}</div>;
}

export function ChatListItem() {
  return <div className="flex flex-col"> </div>;
}

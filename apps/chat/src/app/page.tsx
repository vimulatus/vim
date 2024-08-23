import { ChatBubble } from "@vim/ui/chat-bubble";
import { ChatList } from "../components/chat-list";

export default function Home() {
  const text =
    "a very large text to check how the component handles it. However, it still is very short. I need texxxxxxxxxxtttttt. Is this enough ? I hardly doubt it. I need a girl man. I bet she would have written a two page article by now. I am so dumb! 😭";
  return (
    <div className="flex h-full">
      <ChatList>Hello</ChatList>
      <div className="flex-grow h-full flex flex-col gap-2">
        <ChatBubble content="Hello" position="right" />
        <ChatBubble content={text} position="left" variant="secondary" />
      </div>
    </div>
  );
}

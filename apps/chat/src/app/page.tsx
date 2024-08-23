import { ChatBubble } from "@vim/ui/chat-bubble";
import { ChatList, Chat } from "../components/chat-list";
import { ChatInfoBar } from "../components/chat-info";

const users = [
  {
    name: "Vasu Mittal",
    uid: "abdkdk",
    online: true,
  },
  {
    name: "Montu Mittal",
    uid: "abncsk",
    online: false,
  },
  {
    name: "Gauri Mittal",
    uid: "kdkdkd",
    online: true,
  },
];

export default function Home() {
  const text =
    "a very large text to check how the component handles it. However, it still is very short. I need texxxxxxxxxxtttttt. Is this enough ? I hardly doubt it. I need a girl man. I bet she would have written a two page article by now. I am so dumb! 😭";
  const text2 =
    "Husan tera tauba tauba, tauba tauba! Husan tera tauba tauba, tauba tauba! Husan tera tauba tauba, tauba tauba! Husan tera tauba tauba, tauba tauba! ";
  return (
    <div className="flex h-full">
      <ChatList>
        {users.map((user) => (
          <Chat user={user} key={user.uid} unread={0} pinned={false} />
        ))}
      </ChatList>
      <div className="flex-grow h-full flex flex-col gap-2">
        <ChatInfoBar
          user={{ name: "Vasu Mittal", uid: "abckd", online: true }}
        />
        <div className="flex h-full flex-col gap-2">
          <ChatBubble content="Hello" variant="sent" />
          <ChatBubble content={text} variant="received" />
          <ChatBubble content={text2} variant="sent" />
          <ChatBubble content={text} variant="sent" />
        </div>
      </div>
    </div>
  );
}

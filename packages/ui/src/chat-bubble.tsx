import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@vim/ui/lib/utils";
import React from "react";

const chatBubbleVariants = cva(
  "max-w-lg w-fit p-4 m-4 rounded-xl relative inline-flex justify-center items-center ",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white border-blue-500",
        secondary: "bg-gray-300 text-accent-foreground border-gray-300",
      },
      position: {
        right:
          "pl-3 pr-5 place-self-end after:content-[''] after:absolute after:bg-background after:h-full after:w-6 after:rounded-bl-full rounded-r-none after:-right-4 border-e-8",
        left: "place-self-start pl-6 before:content-[''] before:absolute before:bg-background before:h-full before:w-6 before:-left-4 before:rounded-br-full border-s-8 rounded-l-none",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ChatBubbleVariants = VariantProps<typeof chatBubbleVariants>;

interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ChatBubbleVariants {
  content: string;
  className?: string;
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ content, position, className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(chatBubbleVariants({ variant, position, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </div>
    );
  },
);
ChatBubble.displayName = "ChatBubble";

export { ChatBubble };

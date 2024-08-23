import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@vim/ui/lib/utils";
import React from "react";

const chatBubbleVariants = cva(
  "max-w-lg w-fit p-4 mx-2 first:mt-2 rounded-xl relative inline-flex justify-center items-center gap-4",
  {
    variants: {
      variant: {
        sent: "bg-primary text-white border-primary pl-3 pr-5 place-self-end after:content-[''] after:absolute after:bg-background after:h-full after:w-6 after:rounded-bl-full rounded-r-none after:-right-4 border-e-8",
        received:
          "bg-secondary text-accent-foreground border-secondary place-self-start pl-6 before:content-[''] before:absolute before:bg-background before:h-full before:w-6 before:-left-4 before:rounded-br-full border-s-8 rounded-l-none",
      },
    },
    defaultVariants: {
      variant: "sent",
    },
  },
);

type ChatBubbleVariants = VariantProps<typeof chatBubbleVariants>;

interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
  ChatBubbleVariants {
  content: string;
  className?: string;
  time?: Date;
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ content, className, variant, time, ...props }, ref) => {
    return (
      <div
        className={cn(chatBubbleVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <p>{content}</p>
        <p className="place-self-end text-xs text-muted-foreground">
          {time?.toString() ?? "10:00"}
        </p>
      </div>
    );
  },
);
ChatBubble.displayName = "ChatBubble";

export { ChatBubble };

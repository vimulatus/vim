"use client";

import { cn } from "@vim/ui/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const TEXT_LENGTH_ERROR = "Oops! Seems like no text was provided!";

export function Typewriter({
  texts,
  typeDuration = 120,
  waitDuration = 1000,
  eraseDuration = 50,
  disableChange = false,
  className,
}: {
  texts: string[];
  typeDuration?: number;
  waitDuration?: number;
  eraseDuration?: number;
  disableChange?: boolean;
  className?: string;
}) {
  const getRandom = useCallback(() => {
    return Math.floor(Math.random() * texts.length);
  }, [texts]);

  const [displayedText, setDisplayedText] = useState<string>("");
  const [erase, setErase] = useState<boolean>(false);
  const [j, setJ] = useState<number>(getRandom());
  const [currText, setCurrText] = useState<string>(
    texts[j] ?? TEXT_LENGTH_ERROR,
  );
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (!erase && i < currText.length) {
        setDisplayedText(currText.substring(0, i + 1));
        setI(i + 1);
      }

      if (!erase && !disableChange && i === currText.length) {
        setTimeout(() => {
          setErase(true);
          clearInterval(typingEffect);
          setJ(getRandom());
        }, waitDuration);
      }
    }, typeDuration);

    const eraseEffect = setInterval(() => {
      if (erase && i > 0) {
        clearInterval(typingEffect);
        setDisplayedText(currText.substring(0, i - 1));
        setI(i - 1);
      }

      if (erase && i === 0) {
        setErase(false);
        clearInterval(eraseEffect);
        setCurrText(texts[j] ?? TEXT_LENGTH_ERROR);
      }
    }, eraseDuration);

    return () => {
      clearInterval(typingEffect);
      clearInterval(eraseEffect);
    };
  });

  return (
    <div className="flex items-center">
      <h1 className={cn("cursor-default drop-shadow-sm", className)}>
        {displayedText}
      </h1>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn("block rounded-sm scale-125 -ml-1 mb-3", className)}
      >
        |
      </motion.span>
    </div>
  );
}

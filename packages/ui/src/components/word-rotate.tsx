import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@vim/ui/lib/utils";

export function WordRotate({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const getRandom = useCallback(() => {
    return Math.floor(Math.random() * (words.length - 1) + 1);
  }, [words]);

  const [j, setJ] = useState<number>(0);

  useEffect(() => {
    const rotateEffect = setInterval(() => {
      setJ((i) => (i + getRandom()) % words.length);
    }, duration);

    return () => {
      clearInterval(rotateEffect);
    };
  }, [words, duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={words[j]}
        className={cn(className)}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {words[j]}
      </motion.div>
    </AnimatePresence>
  );
}

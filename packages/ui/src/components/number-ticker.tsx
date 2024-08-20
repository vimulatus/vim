"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@vim/ui/lib/utils";
import { useEffect, useRef } from "react";

export function NumberTicker({
  start = 0,
  value,
  delay = 0,
  className,
}: {
  start?: number;
  value: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const motionValue = useMotionValue(start);

  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
  }, [motionValue, isInView, delay, value, start]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            Number(latest.toFixed(0)),
          );
        }
      }),
    [springValue],
  );

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-black dark:text-white tracking-wider",
        className,
      )}
      ref={ref}
    />
  );
}

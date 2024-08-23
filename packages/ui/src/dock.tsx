"use client";

import { cn } from "@vim/ui/lib/utils";
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Children,
  type ReactElement,
  type ReactNode,
  cloneElement,
  useRef,
  useState,
} from "react";

export function Dock({
  className,
  children,
}: {
  className?: string;
  children: ReactElement;
}) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className={cn(
        "mx-auto flex h-16 gap-1 items-end rounded-2xl bg-white/10 dark:bg-black/10 pb-3 border fixed bottom-2 inset-x-0 max-w-fit z-50",
        className,
      )}
    >
      {Children.map(children, (child: ReactElement) => {
        return cloneElement(child, {
          mouseX: mouseX,
        });
      })}
    </motion.div>
  );
}

export function DockItem({
  mouseX,
  className,
  tooltip,
  children,
}: {
  mouseX: MotionValue;
  className?: string;
  tooltip?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX ?? 0, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hover, setHover] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "aspect-square rounded-full bg-transparent hover:bg-accent hover:text-accent-foreground flex items-center justify-center relative cursor-pointer m-0",
        className,
      )}
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 text-popover-foreground shadow-md border absolute left-1/2 -translate-x-1/2 -top-8 w-fit overflow-hidden z-50 bg-popover"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center *:h-full *:w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

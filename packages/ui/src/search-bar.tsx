"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import * as React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ placeholder = "Search...", className, ...props }, ref) => {
    return (
      <div className={cn("relative ml-auto flex-1 md:grow-0", className)}>
        <Search className="absolute left-2.5 top-[0.72rem] h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="w-full rounded-lg bg-background pl-8"
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
SearchBar.displayName = "SearchBar";

const SearchBarWithButton = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    const [search, setSearch] = React.useState(false);

    return (
      <motion.div>
        {search ? (
          <SearchBar
            autoFocus
            {...props}
            ref={ref}
            onBlur={(e) => {
              if (!e.target.value) {
                setSearch(false);
              }
            }}
            onKeyUp={(e) => {
              if (e.key === "Escape") {
                setSearch(false);
              }
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
          />
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setSearch(true)}>
            <Search className="w-4 h-4 text-muted-foreground" />
          </Button>
        )}
      </motion.div>
    );
  },
);

export { SearchBar, SearchBarWithButton };

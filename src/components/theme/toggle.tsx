"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";

export const Toggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "light" ? "dark" : "light");
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

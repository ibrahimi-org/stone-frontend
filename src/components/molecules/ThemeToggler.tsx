"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  useSwitch?: boolean;
}

const ThemeToggler: React.FC<Props> = ({ useSwitch = true }) => {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    console.log(" theme changed . . ");
  }, [theme]);

  return useSwitch ? (
    <span>
      <Button variant="link" size="icon_md">
        <Icon
          onClick={() => setTheme("light")}
          color="var(--peach-5)"
          icon="solar:sun-bold-duotone"
          className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 absolute"
        />
        <Icon
          onClick={() => setTheme("dark")}
          color="var(--primary)"
          icon="solar:cloudy-moon-bold-duotone"
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0"
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </span>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary" size="icon_md">
          <Icon
            color="var(--peach-5)"
            icon="solar:sun-bold-duotone"
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 "
          />
          <Icon
            color="var(--primary)"
            icon="solar:cloudy-moon-bold-duotone"
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggler;

"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: {
    container: "w-[2.25rem] h-[1.25rem]",
  },
  md: {
    container: "w-[2.75rem] h-[1.5rem]",
  },
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    size?: "sm" | "md";
    value?: any;
    onChange?: (e: any) => void;
  }
>(({ className, size = "sm", ...props }, ref) => {
  const { container } = sizeClasses[size];

  return (
    <SwitchPrimitives.Root
      className={cn(
        `${container}`,
        "peer group inline-flex p-xxs shrink-0 cursor-pointer items-center rounded-full border-0 border-brand shadow-sm transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-background",
        "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-disabled disabled:data-[state=unchecked]:bg-disabled",
        "data-[state=checked]:bg-brand-solid data-[state=unchecked]:bg-tertiary data-[state=checked]:hover:bg-brand-solid-hover",
        className
      )}
      {...props}
      checked={props.checked ?? props.value}
      onCheckedChange={props.onCheckedChange ?? props.onChange}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "h-full w-0 pl-[50%] group-disabled:bg-toggle-button-fg_disabled pointer-events-none block rounded-full bg-[white] shadow-lg ring-0 transition-transform",
          `data-[state=checked]:translate-x-[100%]`,
          `data-[state=unchecked]:translate-x-0`
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-sm border border-cocoa-200 bg-cream-50 px-4 text-sm text-cocoa-800 placeholder:text-cocoa-300 transition-colors focus:border-cocoa-500 focus:outline-none focus:ring-2 focus:ring-gold-300",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

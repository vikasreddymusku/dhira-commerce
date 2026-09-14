import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md border border-cocoa-100 bg-cream-50 p-6 shadow-card",
        className,
      )}
      {...props}
    />
  );
}

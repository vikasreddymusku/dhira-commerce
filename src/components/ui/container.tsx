import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Site-wide layout container. Centralises the max content width and
 * responsive horizontal padding used across storefront and admin shells.
 */
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

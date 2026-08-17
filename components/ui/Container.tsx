import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-site px-2.5 sm:px-3.5 lg:px-3", className)}>
      {children}
    </div>
  );
}

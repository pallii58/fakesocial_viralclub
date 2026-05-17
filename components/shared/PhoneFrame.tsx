"use client";

import { forwardRef, type ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  showBackground?: boolean;
}

export const PhoneFrame = forwardRef<HTMLDivElement, PhoneFrameProps>(
  function PhoneFrame({ children, className = "", showBackground = true }, ref) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="relative rounded-[2.5rem] border-[6px] border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-2 shadow-[0_0_50px_rgba(139,92,246,0.15)]">
          <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
          <div
            ref={ref}
            id="mock-export-root"
            className={`relative h-[812px] w-[375px] overflow-hidden rounded-[2rem] ${
              showBackground ? "bg-white" : "bg-transparent"
            }`}
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

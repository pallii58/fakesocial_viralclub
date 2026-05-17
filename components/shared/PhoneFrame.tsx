"use client";

import { forwardRef, type ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export const PhoneFrame = forwardRef<HTMLDivElement, PhoneFrameProps>(
  function PhoneFrame({ children, className = "" }, ref) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="relative rounded-[2.5rem] border-[6px] border-zinc-800 bg-zinc-800 p-2 shadow-2xl">
          <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-zinc-900" />
          <div
            ref={ref}
            id="mock-export-root"
            className="relative h-[812px] w-[375px] overflow-hidden rounded-[2rem] bg-white"
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

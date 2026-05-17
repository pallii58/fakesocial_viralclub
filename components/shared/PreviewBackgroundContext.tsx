"use client";

import { createContext, useContext } from "react";

interface PreviewBackgroundContextValue {
  showBackground: boolean;
}

const PreviewBackgroundContext = createContext<PreviewBackgroundContextValue>({
  showBackground: true,
});

export function PreviewBackgroundProvider({
  showBackground,
  children,
}: {
  showBackground: boolean;
  children: React.ReactNode;
}) {
  return (
    <PreviewBackgroundContext.Provider value={{ showBackground }}>
      {children}
    </PreviewBackgroundContext.Provider>
  );
}

export function usePreviewBackground() {
  return useContext(PreviewBackgroundContext);
}

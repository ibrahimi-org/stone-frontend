"use client";
import Loading from "@/components/molecules/LoadingWrapper";

import "@/configs/parse/parse-browser";
import React, { createContext, useContext, useState } from "react";

interface ContextData {
  showLoading: (show: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const defaultValue: ContextData = {
  showLoading: (show: boolean) => {},
  isLoading: true,
  setIsLoading: (value: boolean) => {},
};

const GlobalContext = createContext<ContextData>(defaultValue);

export const useGlobal = () => useContext(GlobalContext);

export function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showLoading = (show: boolean) => {
    setIsLoading(show);
  };

  return (
    <GlobalContext.Provider
      value={{
        showLoading,
        isLoading,
        setIsLoading,
      }}
    >
      {isLoading ? <Loading /> : null}

      {/* <Navbar /> */}
      {children}
    </GlobalContext.Provider>
  );
}

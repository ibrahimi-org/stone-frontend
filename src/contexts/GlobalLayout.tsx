"use client";
import Loading from "@/components/molecules/LoadingWrapper";
import i18n from "@/configs/i18next/i18n";
import { DialogBase as Modal } from "@/lib/types/dialogs";
import { isEmpty } from "lodash-es";
import React, { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

interface ContextData {
  dialogs: Record<string, Modal>;
  showDialog: (options: Modal) => void;
  closeDialog: (key: string) => void;
  showLoading: (show: boolean) => void;
}

const defaultValue: ContextData = {
  dialogs: {},
  showDialog: (dialog: Modal) => {},
  closeDialog: (key: string) => {},
  showLoading: (show: boolean) => {},
};

const GlobalContext = createContext<ContextData>(defaultValue);

export const useGlobal = () => useContext(GlobalContext);

export function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [dialogs, setDialogs] = useState<Record<string, Modal>>({}); // max 10
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showDialog = (dialog: Modal | null | undefined) => {
    console.log(" mm 10 - -  dialog - showDialog()  -    ", dialog);
    if (!dialog) return;

    setDialogs((m) => {
      const base =
        dialog instanceof Modal
          ? dialog
          : new Modal((key) => closeDialog(key), dialog);
      const n = { ...m, [base.key]: base };
      return n;
    });
  };

  const closeDialog = (key: string) => {
    console.log(".. closing dialog", key);
    // if (!Object.hasOwn(dialogs, key)) return;

    setDialogs((m) => {
      const temp = { ...m };
      const dialog = temp[key]!;
      dialog.open = false;
      temp[key] = dialog;
      setTimeout(() => {
        // this completely clear caches after 3 seconds. Adjust based on your need.
        setDialogs((ma) => {
          const t = { ...ma };
          delete t[key];
          return t;
        });
      }, 3000);
      return temp;
    });
  };

  const showLoading = (show: boolean) => {
    setIsLoading(show);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, [isLoading]);

  return (
    <GlobalContext.Provider
      value={{
        showDialog,
        dialogs,
        closeDialog,
        showLoading,
      }}
    >
      <I18nextProvider i18n={i18n}>
        {!isEmpty(dialogs)
          ? Object.entries(dialogs).map(([_, value]) => {
              return value.render();
            })
          : null}

        {isLoading ? <Loading /> : null}

        {children}
      </I18nextProvider>
    </GlobalContext.Provider>
  );
}

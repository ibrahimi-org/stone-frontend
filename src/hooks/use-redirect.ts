"use client";
import { useGlobal } from "@/contexts/GlobalLayout";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { useEffect } from "react";

export const useRedirectQuery = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const { setIsLoading } = useGlobal();

  const redirectUrl = searchParams.get("redirect");
  const action = searchParams.get("action");
  const redirect = (url: string = "/") => {
    if (action === "replace") router.replace(redirectUrl ?? url);
    else router.push(redirectUrl ?? url);
  };

  const routeChangeComplete = () => {
    setIsLoading(false);
  };
  const routeChangeStart = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    routeChangeComplete();

    return () => {
      routeChangeStart();
    };
  }, [pathname, searchParams]);

  return [redirect];
};

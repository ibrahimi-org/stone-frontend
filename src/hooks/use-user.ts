"use client";
import ParseBrowser from "@/configs/parse/parse-browser";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState<
    ParseBrowser.User<ParseBrowser.Attributes> | undefined
  >();

  useEffect(() => {
    setUser(ParseBrowser.User.current());
  }, []);
  return user;
}

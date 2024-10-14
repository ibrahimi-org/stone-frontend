"use client";

import useUser from "@/hooks/use-user";

export default function UserName() {
  const user = useUser();
  return (
    <div>
      <p>username: {user?.get("email")}</p>
    </div>
  );
}

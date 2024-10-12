"use client";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import locales from "@/locales/en/error-codes.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import * as _ from "lodash-es";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const t = (key: string): any => _.get(locales, key);

export const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.replace("/");

    try {
      fetch("http://localhost:3000/api/auth/sign-in", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(values),
      }).then(async (re) => {
        const data = await re.json();
        const { user, sessionToken } = data;
        setCookie("session-token", sessionToken);
        console.log("LOggedldsjkf ", data);
        alert(`Logged in as ${user.get("username")}`);
      });
    } catch (error) {
      console.error("Error while logging in:", error);
    }

    // const res = fetch("http://localhost:3000/api/auth/sign-in", {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "post",
    //   body: JSON.stringify(values),
    // }).then(async (re) => {
    //   const data = await re.json();
    //   const { user, sessionToken } = data;
    //   setCookie("session-token", sessionToken);
    //   console.log("LOggedldsjkf ", data);
    // });
  }

  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="w-[50%] h-[70%] bg-slate-500 rounded-2xl flex-row justify-center p-[50px] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <MyInput
              control={form.control}
              name="username"
              label="Username"
              formMessage={formSchema}
              className="w-[50%] mb-3"
            />

            <MyInput
              control={form.control}
              name="password"
              label="Password"
              type="password"
              formMessage={formSchema}
              className="w-[50%] mb-3"
            />

            <Input
              type="submit"
              className="w-[50%] mt-6 bg-cyan-00 hover:bg-cyan-700 cursor-pointer"
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

"use client";

import { Field } from "@/components/atoms/Field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ParseBrowser from "@/configs/parse/parse-browser";
import { useGlobal } from "@/contexts/GlobalLayout";
import { useRedirectQuery } from "@/hooks/use-redirect";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { setCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { AppContants } from "@/lib/constants";
import { Session } from "parse";

export const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function SignInPage() {
  const { t } = useTranslation("translation");
  const { setIsLoading } = useGlobal();
  const [redirect] = useRedirectQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const user = await ParseBrowser.User.logIn(
        values.username,
        values.password
      );
      const token = user.getSessionToken();
      setCookie(AppContants.ParseSessionCookieName, token);
      redirect();
    } catch (err: any) {
      toast({ description: t(`auth.error.${err.code}`), variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Suspense fallback={"Loading"}>
      <div className="h-dvh flex justify-center items-center">
        <div className="w-[50%] h-[70%] bg-slate-500 rounded-2xl flex-row justify-center p-[50px] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Field
                name="username"
                control={form.control}
                Input={Input}
                label={t("auth.username")}
              />
              <Field<"input">
                name={"password"}
                Input={Input}
                label={t("auth.password")}
              />
              <Input
                type="submit"
                className="w-[50%] mt-6 bg-cyan-00 hover:bg-cyan-700 cursor-pointer"
              />
            </form>
          </Form>
        </div>
      </div>
    </Suspense>
  );
}

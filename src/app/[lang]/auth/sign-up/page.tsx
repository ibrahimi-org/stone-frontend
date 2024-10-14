"use client";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpAPI } from "@/lib/http/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as _ from "lodash-es";
import ParseBrowser from "@/configs/parse/parse-browser";
import { useGlobal } from "@/contexts/GlobalLayout";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { Field } from "@/components/atoms/Field";
import { useRedirectQuery } from "@/hooks/use-redirect";

export const formSchema = z.object({
  fullname: z.string(),
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, "Password must be 6 characters long"),
});

export default function SignUpPage() {
  const { setIsLoading } = useGlobal();
  const { t } = useTranslation("translation");
  const [redirect] = useRedirectQuery();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user = new ParseBrowser.User(values);
    setIsLoading(true);
    user
      .signUp()
      .then(() => {
        toast({ description: t("auth.signup_success"), variant: "success" });
        redirect();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className=" bg-slate-500 rounded-2xl flex-row justify-center p-[50px] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Field
              name="fullName"
              control={form.control}
              Input={Input}
              InputProps={{
                type: "text",
                placeholder: t("auth.fullName_hint"),
              }}
              label={t("auth.fullName")}
            />
            <Field
              name="username"
              control={form.control}
              Input={Input}
              InputProps={{
                type: "text",
                placeholder: t("auth.username_hint"),
              }}
              label={t("auth.username")}
            />
            <Field
              name="email"
              control={form.control}
              Input={Input}
              InputProps={{ type: "email", placeholder: t("auth.email_hint") }}
              label={t("auth.email")}
            />
            <Field
              name="password"
              control={form.control}
              Input={Input}
              InputProps={{
                type: "password",
                placeholder: t("auth.password_hint"),
              }}
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
  );
}

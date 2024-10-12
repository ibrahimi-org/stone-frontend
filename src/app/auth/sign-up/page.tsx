"use client";

import MyInput from "@/components/atoms/MyInput";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpAPI } from "@/lib/http/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import locales from "@/locales/en/error-codes.json";
import _ from "lodash-es";

const t = (key: string): any => _.get(locales, key);

export const formSchema = z.object({
  fullname: z.string(),
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, "Password must be 6 characters long"),
});

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
  });
  console.log(typeof locales);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    SignUpAPI(values)
      .then((res) => {
        alert("Success!");
      })
      .catch((err) => {
        alert(t(err.code));
      });
  }

  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="w-[50%] h-[70%] bg-slate-500 rounded-2xl flex-row justify-center p-[50px] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <MyInput
              control={form.control}
              name="fullname"
              label="Full name"
              formMessage={formSchema}
              className="w-[50%] mb-3"
            />

            <MyInput
              control={form.control}
              name="username"
              label="Username"
              formMessage={formSchema}
              className="w-[50%] mb-3"
            />

            <MyInput
              control={form.control}
              name="email"
              label="E-mail"
              type="email"
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

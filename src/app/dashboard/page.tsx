"use client";

import { Field } from "@/components/atoms/Field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGlobal } from "@/contexts/GlobalLayout";
import { useToast } from "@/hooks/use-toast";
import {
  DialogBase as Modal,
  PromptDialog as Prompt,
  TagDialog,
} from "@/lib/types/dialogs";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Dashboard() {
  const [countState, setCountState] = useState<number>(1);

  const { showDialog, closeDialog, dialogs, showLoading } = useGlobal();

  const methods = useForm();

  function onSubmit(values: any) {
    console.log("mm 100 - - - ", values);
  }

  const { toast } = useToast();

  const showMyAlert = () => {
    // setCountState(countState + 1);
    toast({
      title: `----------         hiii  ${countState}     ----------- `,
      variant: "error",
      position: "bottom",
    });
  };

  const showMyLoading = () => {
    showLoading(true);
  };

  const showMyDialog100 = () => {
    console.log("---------", dialogs);
    const dialog = new Modal((key) => closeDialog(key), {
      header: {
        title: "first title",
        desc: "I am description of this Diaolg ... !",
      },
      content: (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Field
              name="radioGroup"
              renderInput={(field) => (
                <RadioGroup {...field}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="indeterminate" id="r1" />
                    <Label htmlFor="r1">indeterminate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"true"} id="r2" />
                    <Label htmlFor="r2">True</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"false"} id="r3" />
                    <Label htmlFor="r3">False</Label>
                  </div>
                </RadioGroup>
              )}
            />

            <Button type="submit">submit</Button>
          </form>
        </FormProvider>
      ),
      footer: (
        <div className="flex ">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Button type="submit">Submit</Button>
            </form>
          </FormProvider>
          <Button onClick={() => openPromptDialog()}>Input Value</Button>
          <Button onClick={() => openTagDialog()}>Logout</Button>
          <Button
            onClick={() => {
              console.log(" mm 20 - - dialog   , ", dialog);
              console.log(" mm 20 - - dialogss   , ", dialogs);
              closeDialog(dialog.key);
            }}
          >
            Close me
          </Button>
        </div>
      ),
    });
    showDialog(dialog);
  };

  const onClick = (value: any, key: string) => {
    console.log("input value......", value, key);
    closeDialog(key);
  };

  const openPromptDialog = () => {
    showDialog(
      new Prompt((key) => closeDialog(key), "OK", console.log, {
        type: "text",
        maxLength: 5,
      })
    );
  };
  const openTagDialog = () => {
    showDialog(
      new TagDialog(
        (key) => closeDialog(key),
        "Do want to logout?",
        <Button className="bg-success-500">"Yes"</Button>,
        <Button className="bg-error-800">No</Button>,
        console.log,
        { className: "flex space-x-3 w-full justify-center" }
      )
    );
  };

  return (
    <main>
      <div className="w-[600px] h-[150px] flex-wrap justify-center place-items-center bg-blue-950 rounded-2xl hover:shadow-2xl">
        <h1>DASHBOARD </h1>
        <div className="flex justify-end ml-4">
          <Button className="bg-yellow-400 text-blue-950" onClick={showMyAlert}>
            Show Alert
          </Button>

          <Button
            className="bg-green-400 text-blue-950 ml-2"
            onClick={() => showMyDialog100()}
          >
            Show global Dialog ede
          </Button>

          <Button
            className="bg-yellow-400 text-blue-950"
            onClick={showMyLoading}
          >
            Show Loading
          </Button>
        </div>
      </div>
    </main>
  );
}

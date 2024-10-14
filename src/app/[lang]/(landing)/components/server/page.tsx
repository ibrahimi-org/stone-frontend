"use client";
import { Input } from "@/components/ui/input";
import { CgMoon, CgSun } from "react-icons/cg";
import React from "react";
import SelectInput from "@/components/molecules/SelectInput";
import { HorizontalDirection } from "@/lib/constants";
import { Form } from "@/components/ui/form";
import { Field } from "@/components/atoms/Field";
import { Select } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import MySelect from "@/components/molecules/select/MySelect";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleSelector, {
  Option,
} from "@/components/molecules/select/MultiSelect";

import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ServerPage() {
  const form = useForm({
    defaultValues: {
      test: "default value of test",
      select: "",
    },
  });

  function onSubmit(values: any) {
    console.log("mm 100 - - - ", values);
  }

  const options: SelectItemType[] = [
    { label: <CgMoon />, value: "moon" },
    { label: <CgSun />, value: "sun" },
    { label: "Select", value: "select" },
    {
      label: <p>Your select p with long text is here and continue</p>,
      value: "your_select",
    },
  ];

  const OPTIONS: Option[] = [
    {
      label: "nextjs",
      value: "Nextjs",
      avatar:
        "data:image/webp;base64,UklGRuIHAABXRUJQVlA4INYHAAAwKQCdASq5AHcAPpUmpVKloSWlldCwEolnANQM8Yff3bvr89gWbPbuLmSMP9QVPH/7PmlTM/2AXyUEGU0InhkXe4ff8ZQSyoj+7xDyD0f245ZZhfe+a7TqWRKUkn7mTPswxF8UMM5cGUUriIoZhmWC/w2RFlldfFheJ8XDUBaDDdYowTt+47FhAtMjQW8lAx01PMehwXf4WEDj02EdPzEzal2uz6r+kbjfnQkreux39Xpjp2Mo+CbOtA9dUPNYKwamNfs8Bno4HH60S0KXHeADMDdPdMA8Tvnxz5sSlK9BA69kjHzx/gPPCIkPw4Yl+ISnFrE2qtbXljM4bQ2mdbh1vncVW2v3MTB3JPYQOwCHOwgMQda4cs30J/rXa2bat19uDCR+TEzfh8lzT0/0LseRx6lzAvOXoTNqf+Djo3TvnrfJr0a6TuZps8pEdU2iCx2aUAD+/PQABuTmOd+NoCBDatN5rDkPu35Vzi+We9rvrE20Kz4Uval+3PX+M5/ZMWvqh6emE27uJDRwtq5byX0x8AnjmP0CCf/AFU+9fMSvAHDKW/3UWF9DSZJD8nuXz+E+eImJ84Tl1n28eofOLWKAAAHNcqP3Xi/HmT2CZzygy/TRFzazILaHfbpqwYlcB/A2SQ1kxP/MAFjnEnBDM44WLOF7KL3XhXrw/Obxggto3UWUUANndBgnb4FRrmRkkCcwjBpmC+hhhfWrMGe5bs3A+t1IlrbdLKG3WpZOUMwlJJcw7ALQkTZtQTFiGSvQRZMTgan6fa27jUPhRo/hg25amioeKJdI0J/REc2hVPxufX5th3eQ8f7nXF3mbIj0j895HzXIS/9HQpmJ1FpBm3tfQApeuy2L+qGIEwXeuBUEA1Y3oc0ca2kXYxUOzULFeo6+QifEt6Vr3z9Thn7TY3EL1dlVHk4Lr5Agwv/Hh4/RTO8HfxsMNS9gvA6oyPurQNGoz2Dbe2N0kqhiIjmiudon6cc6Fd86KMChwqWdT2HzDvW3Y1ihfyw9yYJFKtkpzhTA4lODWzBOvdKS95mdVz9FWfdpk1qsoj9vN2jcxaaIc2fMmiI5KZMhHrfs0qhIAOyXKnnXgsLe9mCg6njfLtjdoEMQzCch7hUaL1DalNeKCGMLD5q9dZpuGhginwoaQ6hh9wAAW7d+oWdF+Cf0vAHPkrG3F8y6//79zWj3/fag/7oTSqWZWrsySUbayBwRolf1cQ4KVn9IBUSTzI1MLALusUa98wSWkSMZa1yunFoCrVAkXdL719VrB82qiei7e2vH39uZmOJ+W1Bt027QqyKGioVM1uajw8dCIVCunf/krIvdEZjDirfgQDW1dgNNNQY7YTp2pnAt9czpoabrazrqzzOb0qaU7TGuwQ9Hbq9b1wvhflQYzEJ4iW9mbvsVdnYrs8SDHTQ/E6w00B10LUN/N9IRnjPN27MOFXI6HWGOmKnuPNRhzGum4fcTxmeMypkKuhGqOaQEY60jXiyn6UXRdlUj03owKbYlr7So2sA9hxVC66O255wp9M8B1eMg4YKUuppYmuSVvFMhvAAUWz0f/ljAy8SrwWBaviPBfD1GKVL/zidhHUkhipS31eOqaiPcm4OsYEPLvz0I6+mkMy6H4x9ak4gLuQziVa0L5A/dV9MChtnuULFoaWRcT/ghiNHxI5OjHrg8lGE0y3oiEY3x9bUsdjUWEkIPh0sU5QedX8+bx9sb9I5kygkb7K+04PFb0ijnsoPpnvvLMkGGHujalXLdR7MTgRIDZxbgW88Iv44HIgRbn6X6jemGWHiLkB3CtgwVUBYo57HiTEX+76ajHC07EIPhdbbjE9N8ojEFRt5NOU0IB2cAXsLY1XVp5PgrGT++JlfIEJQTZxxIOLHFr6fiJZAJiraG3u0J5F4bIZpKrqgreaen1sbW+ZxtbQi/go8BKZ84LwiZB6wWSSdZ7RRCeUd5vXPdP3bLR3Qr/mYYWKwDQsR3ZwtgCCynuG9pr6oqZTjDRemcEQQ/cSvH+yBdx9PLKoOeSGe6tGkbru4cTZ7N9AXvvoCoVax+qadkb30e8AB5I1cbThSeMXRTwuS58Wz3UntlrV9gLOOv+0nqV+WDI6bv09Kro7gcjSBB5RpX1yATzhDOPkH9lWozmxpeRyZ1wR0vmv3WSssuGJKO2/V/yfN6zV66ABcURCzczS1L19d1aLT1txmHd3ocW+LGo7kNZHkgkN3UUbL/B93roI6c7s/8z30/+okDEyZTzgKs8YrEmadko4KaKIhKr8fHZqTmXzAyUShd8Droya6oAxmy1quGQ6qJ2TbRSm7U4lUh0cpIyG9v0v9XN8bCvi/fnLGTnfgCichjXVd4eyTxRTrbbdIm1cnWLYz7YNX2SQSKm+KW2oB7n6t/mKVjJ3PXGYCE6dBj6niXwCbhgskJavhZPy8vpoADR7RN0B/gDF9AGGLzogtXT2GnO+z5ovmmuxVqE0uomMhGfpqei+3/hco7seJmlFK1dwvmL3dIGcJ1kobFK5QFeHyRLXj0s6pTcN6MVKlHWR3nlJMhorY+EUUM7W2+XNgh4tiwgyewp8U6YK9un4+PR3BLIuEDiy0hgjsRS+DXR/zKMEJYNypuZ2O0rlBPmjdzqjsjzYbqT6Z24mmBWDgbTXPN5B+CISFnB9Op11cxasRSunKNvagp7+AAAA==",
    },
    { label: "Vite", value: "vite" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Vue", value: "vue, disable: true", disable: true },
    { label: "Remix", value: "remix" },
    { label: "Svelte", value: "svelte", disable: false },
    { label: "Angular", value: "angular" },
    { label: "Ember", value: "ember" },
    {
      label: "React",
      value: "react",
      avatar:
        "data:image/webp;base64,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",
    },
    { label: "Gatsby", value: "gatsby" },
    { label: "Astro", value: "astro", disable: false },
  ];

  return (
    <div className=" p-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Field<"input"> name={"input1"} Input={Input} label="Input Label" />

          <Field<"select">
            name={"country"}
            Input={MySelect}
            InputProps={{ options, placeholder: "Select One" }}
          />
          <Field
            name={"checbox"}
            Input={Checkbox}
            InputProps={{ title: "My Checkbox" }}
          />
          {/* <Field name={"select"} Input={Select} /> */}

          <Field
            name="multiSelect"
            Input={MultipleSelector}
            InputProps={{
              options: OPTIONS,
              onChangeValue: (o: any) => o.label + " " + o.value,
            }}
          />

          <Field name="switch" Input={Switch} />

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

          <Input
            type="submit"
            value={"Submit"}
            className="w-[100px] mt-6 bg-cyan-00 hover:bg-cyan-700 cursor-pointer"
          />
        </form>
      </Form>
    </div>
  );
}

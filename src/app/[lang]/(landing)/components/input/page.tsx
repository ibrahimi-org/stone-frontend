import MySelect from "@/components/molecules/select/MySelect";
import ThemeToggler from "@/components/molecules/ThemeToggler";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { CgMoon, CgSun } from "react-icons/cg";

export default function InputPage() {
  const options: SelectItemType[] = [
    { label: <CgMoon />, value: "moon" },
    { label: <CgSun />, value: "sun" },
    { label: "Select", value: "select" },
    {
      label: <p>Your select p with long text is here and continue</p>,
      value: "your_select",
    },
  ];

  return (
    <div className="flex flex-col space-y-5 p-8">
      <div className="flex flex-col w-1/5 space-y-5">
        <ThemeToggler />
        <Input
          inputSize={"sm"}
          type="text"
          placeholder="sm"
          Trailing={<CgMoon />}
          Leading={<CgSun />}
        />
        <Input
          inputSize={"sm"}
          type="text"
          placeholder="sm"
          Trailing={<CgMoon />}
          useLeadingDivider={false}
          Leading={<CgSun />}
          useTrailingDivider={false}
          disabled
        />
        <Input
          disabled
          inputSize={"sm"}
          type="text"
          placeholder="sm"
          Trailing={<CgMoon />}
          Leading={<CgSun />}
        />
        <Input inputSize={"md"} type="text" placeholder="md" />
        <Input inputSize={"md"} type="text" placeholder="disabled" disabled />
        <Input
          inputSize={"md"}
          type="text"
          placeholder="disabled"
          useLeadingDivider={true}
          Leading={<p className="">{"http://"}</p>}
        />
        <Input
          inputSize={"md"}
          type="text"
          placeholder="disabled"
          useLeadingDivider={true}
          Leading={<p className="">{"http://"}</p>}
          disabled
        />
        <Input
          inputSize={"md"}
          type="text"
          placeholder="disabled"
          useLeadingDivider={true}
          Leading={
            <MySelect
              size="md"
              options={options}
              classes={{
                trigger:
                  "border-none outline-none focus:border-none focus:ring-0",
              }}
            />
          }
        />
      </div>
    </div>
  );
}

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputClasses } from "@/lib/styles/common";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { SelectProps } from "@radix-ui/react-select";

interface ISelectClassName {
  trigger?: string;
  content?: string;
  group?: string;
  label?: string;
  item?: string;
}

interface ISelect extends SelectProps {
  classes?: ISelectClassName;
  selectSize?: "sm" | "md";
  placeholder?: React.ReactNode;
  selectLabel?: React.ReactNode;
  Leading?: React.ReactNode;
  Trailing?: React.ReactNode;
  className?: string;
  onChange?: (e: any) => void;

  options?: SelectItemType[] | any[];
  renderItem?: (item: SelectItemType | any) => React.ReactNode;
  getItemValue?: (item: SelectItemType | any) => string;
}

const MySelect = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, ISelect>(
  (
    {
      selectLabel,
      placeholder,
      options = [],
      classes,
      renderItem,
      getItemValue,
      selectSize = "sm",
      Leading,
      value,
      onChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const getValue = (o: any) => (getItemValue ? getItemValue(o) : o.value ?? o);
    const render = (item: any) => (renderItem ? renderItem(item) : item.label ?? item);
    return (
      <Select defaultValue={value} onValueChange={onValueChange ?? onChange} {...props}>
        <SelectTrigger ref={ref} className={cn("", InputClasses.size[selectSize].default, classes?.trigger)}>
          {Leading ? (
            <div className="flex space-x-3 items-center">
              {Leading}
              <SelectValue placeholder={placeholder} />
            </div>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent className={cn("", classes?.content)}>
          <SelectGroup className={classes?.group}>
            {selectLabel ? <SelectLabel className={classes?.label}>{selectLabel}</SelectLabel> : null}
            {options.map((item, index) => (
              <SelectItem className={classes?.item} key={getValue(item) + index} value={getValue(item)}>
                {render(item)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

MySelect.displayName = "MySelect";

export default MySelect;

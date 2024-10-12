import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type IFieldProps<D extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[D] & {
    control?: any;
    message?: React.ReactNode | string;
    label?: string;
    Input?: React.ComponentType<any>;
    InputProps?: any;
    name: string;
    renderInput?: (
      field: ControllerRenderProps<FieldValues, string>
    ) => React.ReactNode;
  };
export function Field<D extends keyof JSX.IntrinsicElements>(
  props: IFieldProps<D>
) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            {props.renderInput
              ? props.renderInput(field)
              : props.Input && (
                  <props.Input {...field} {...(props.InputProps || {})} />
                )}
          </FormControl>
          <FormDescription />
          <FormMessage>{props.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}

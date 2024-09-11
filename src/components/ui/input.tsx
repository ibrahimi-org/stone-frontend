"use client";
import * as React from "react";
import { cn, generateRandomString } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Label } from "./label";
import { HorizontalDirection } from "@/lib/constants";
import { SelectItemType } from "@/lib/types/ui/ui.types";
import { Button } from "./button";
import { CopyIcon } from "@radix-ui/react-icons";

export const inputVariants = cva(
  "relative focus-visible:outline-focus-ring flex h-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:placeholder-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:text-disabled",
  {
    variants: {
      variant: {
        default:
          "transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        error: "border-red-500 focus-visible:ring-red-500 focus:ring-1",
        success: "border-green-500 focus-visible:ring-green-500 pl-8",
        file: "border-red-500 focus-visible:ring-red-500 focus:ring-1 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const inputSizeStyle = {
  sm: "py-md px-lg ",
  md: "py-[0.625rem] px-[0.875rem]",
};

const leadingTextStyle = {
  sm: "py-md px-lg ",
  md: "py-[0.625rem] pl-[0.875rem] pr-[0.625rem]",
};
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  StartNode?: React.ReactNode;
  EndNode?: React.ReactNode;
  LeadingNode?: React.ReactNode;
  TrailingNode?: React.ReactNode;

  LeadingTextNode?: React.ReactNode;
  TrailingButtonNode?: React.ReactNode;
  startNodeOffset?: number;
  endNodeOffset?: number;
  leadingNodeOffset?: number;
  trailingNodeOffset?: number;
  selectPosition?: HorizontalDirection;
  options?: SelectItemType[];
  inputSize?: "sm" | "md";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      variant,
      label,
      className = "",
      StartNode,
      startNodeOffset = 8,
      EndNode,
      endNodeOffset = 8,
      LeadingNode,
      TrailingNode,
      LeadingTextNode,
      TrailingButtonNode,
      leadingNodeOffset = 5,
      trailingNodeOffset = 5,
      selectPosition = HorizontalDirection.LEFT,
      inputSize = "sm",
      id,
      ...props
    },
    ref
  ) => {
    const startNode = React.useRef<HTMLDivElement | null>(null);
    const endNode = React.useRef<HTMLDivElement | null>(null);
    const leadingNode = React.useRef<HTMLDivElement | null>(null);
    const trailingNode = React.useRef<HTMLDivElement | null>(null);

    const inputStyle = inputSizeStyle[inputSize];
    const leadingStyle = leadingTextStyle[inputSize];

    const [paddingLeft, setPaddingLeft] = React.useState<number>(10);
    const [paddingRight, setPaddingRight] = React.useState<number>(0);

    const [nodeWidth, setNodeWidth] = React.useState<number>(0);

    const trilingPadding = {
      [selectPosition == HorizontalDirection.LEFT
        ? "paddingLeft"
        : "paddingRight"]: nodeWidth + leadingNodeOffset + "px",
    };

    const endTraingPadding = {
      [selectPosition == HorizontalDirection.LEFT
        ? "paddingRight"
        : "paddingLeft"]: nodeWidth + leadingNodeOffset + "px",
    };

    React.useEffect(() => {
      // Calculate the icon's width and set the left padding for the input
      if (startNode.current) {
        const iconWidth = startNode.current.offsetWidth;
        setPaddingLeft(iconWidth + startNodeOffset); // Adding a little extra space (8px)
      }
      if (endNode.current) {
        const iconWidth = endNode.current.offsetWidth;
        setPaddingRight(iconWidth + endNodeOffset); // Adding a little extra space (8px)
      }

      if (leadingNode.current) {
        const leadingWidth = leadingNode.current.offsetWidth;
        setNodeWidth(leadingWidth + leadingNodeOffset);
        setPaddingLeft(leadingWidth + leadingNodeOffset);
      }

      if (trailingNode.current) {
        const trailingWidth = trailingNode.current.offsetWidth;
        setNodeWidth(trailingWidth + trailingNodeOffset);
        setPaddingRight((state) => state + trailingWidth + trailingNodeOffset);
      }
    }, [startNode, endNode, leadingNode, trailingNode]);

    className += ` ${
      TrailingButtonNode && LeadingTextNode
        ? "rounded-none focus:rounded-none"
        : TrailingButtonNode
        ? "rounded-r-none focus:rounded-r-none"
        : LeadingTextNode
        ? "rounded-l-none focus:rounded-l-none"
        : ""
    } `;
    className += inputStyle;

    id ??= generateRandomString(3);

    return (
      <div className=" flex flex-col">
        {label && (
          <Label
            htmlFor={id}
            className="mb-2 block text-text-sm font-medium text-secondary"
          >
            {label}
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </Label>
        )}
        <div className="flex">
          {LeadingTextNode ? (
            <input
              value={"http://"}
              disabled
              className={`${leadingStyle} h-full w-fit rounded-sm rounded-r-none border border-input`}
            />
          ) : null}
          <div className="w-max relative ">
            <input
              className={cn(
                inputVariants({
                  variant,
                  className,
                })
              )}
              ref={ref}
              style={{
                paddingLeft: `${paddingLeft}px`,
                paddingRight: `${paddingRight}px`,
              }}
              {...props}
              id={id}
              type={type}
            />
            {LeadingNode ? (
              <div
                ref={leadingNode}
                className={`absolute left-0 top-[50%] translate-y-[-50%] z-10 transform`}
              >
                {LeadingNode}
              </div>
            ) : null}
            {StartNode ? (
              <span
                ref={startNode}
                className="absolute pl-3 top-[50%] translate-y-[-50%] z-10 transform bg-red "
              >
                {StartNode}
              </span>
            ) : null}
            {EndNode ? (
              <div
                ref={endNode}
                className={`absolute right-1 pr-3 top-[50%] translate-y-[-50%] z-10 transform`}
                style={TrailingNode ? endTraingPadding : {}}
              >
                {EndNode}
              </div>
            ) : null}

            {TrailingNode ? (
              <div
                ref={trailingNode}
                className={`absolute right-0  top-[50%] translate-y-[-50%] z-10 transform`}
                style={trilingPadding}
              >
                {TrailingNode}
              </div>
            ) : null}
          </div>

          {TrailingButtonNode ? (
            <Button
              variant={"secondaryGray"}
              className=" h-full rounded-l-none border-l-0 focus:!ring-0"
            >
              <CopyIcon />
              Coppy
            </Button>
          ) : null}
        </div>

        <p className="text-tertiary text-text-sm font-regular">hhuiyh</p>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

import { RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";

const TextColor: ResolvableTo<RecursiveKeyValuePair> = {
  foreground: {
    DEFAULT: "hsl(var(--foreground))",
  },
  primary: {
    DEFAULT: "hsl(var(--text-primary))",
    "on-brand": "var(--text-primary_on-brand)",
  },
  secondary: {
    DEFAULT: "hsl(var(--text-secondary))",
    hover: "hsl(var(--text-secondary_hover))",
    "on-brand": "hsl(var(--text-secondary_on-brand))",
  },
  tertiary: {
    DEFAULT: "hsl(var(--text-tertiary))",
    hover: "hsl(var(--text-tertiary_hover))",
    "on-brand": "hsl(var(--text-tertiary_on-brand))",
  },
  quaternary: {
    DEFAULT: "hsl(var(--text-quaternary))",
    "on-brand": "hsl(var(--text-quaternary_on-brand))",
  },
  white: "hsl(var(--text-white))",
  disabled: "hsl(var(--text-disabled))",
  placeholder: {
    DEFAULT: "hsl(var(--text-placeholder))",
    subtle: "hsl(var(--text-placeholder_subtle))",
  },
  brand: {
    primary: "hsl(var(--text-brand-primary))",
    secondary: "hsl(var(--text-brand-secondary))",
    tertiary: {
      DEFAULT: "hsl(var(--text-brand-tertiary))",
      alt: "hsl(var(--text-brand-tertiary_alt))",
    },
  },
  error: {
    primary: "hsl(var(--text-error-primary))",
  },
  warning: {
    primary: "hsl(var(--text-warning-primary))",
  },
  success: {
    primary: "hsl(var(--text-success-primary))",
  },
};

export default TextColor;

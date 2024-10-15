import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { ColorExtends } from "./src/configs/tailwind/colors-extend";
import { SpaceExtend } from "./src/configs/ui/space/space-extend";
import { WidthExtend } from "./src/configs/ui/width/width-extend";
import { SpacingExtend } from "./src/configs/ui/spacing/spacing-extend";
import { RadiusExtend } from "./src/configs/ui/radius/radius-extend";
import { FontWeightExtend } from "./src/configs/ui/typography/fontWeight-extends";
import { TypographyExtends } from "./src/configs/ui/typography/typography-extends";
import TextColor from "./src/configs/tailwind/text-color";
import BorderColor from "./src/configs/tailwind/border-color";
import BackgroundColor from "./src/configs/tailwind/background-color";
import { ShadowExtend } from "./src/configs/ui/shadow/shadow-extend";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    // textColor: TextColor,
    //borderColor: BorderColor,
    // backgroundColor: BackgroundColor,
    screens: {
      // => @media (min-width: 640px and max-width: 767px) { ... }
      mobile: { min: "0px", max: "479px" },
      mobileLS: { min: "480px", max: "779px" },
      tablet: { min: "780px", max: "899px" },
      tabletLS: { min: "900px", max: "1023px" },
      desktop: { min: "1024px", max: "1535px" },
      extra: { min: "1536px" },
    },
    container: {
      center: true, // Centers the container horizontally by applying auto margins.
      padding: {
        DEFAULT: "1rem", // 16px for all breakpoints (default)
        sm: "1rem", // 16px for small screens
        md: "2rem", // 32px for medium screens
        lg: "2rem", // 32px for large screens
        xl: "4rem", // 64px for extra-large screens
        "2xl": "5rem", // 80px for extra-extra-large screens
      },
    },
    extend: {
      fontFamily: {
        lato: ["var(--lato-font-family)", ...fontFamily.sans],
      },
      textColor: TextColor,
      backgroundColor: BackgroundColor,
      borderColor: BorderColor,
      ringColor: BorderColor,
      fontSize: TypographyExtends, //usage: text-display-2xl  text-text-sm
      fontWeight: FontWeightExtend, //usage: font-regular
      colors: ColorExtends,
      borderRadius: RadiusExtend, //usage: rounded-md
      spacing: SpacingExtend, //usage : border-spacing-0
      gap: SpaceExtend,
      padding: SpaceExtend,
      margin: SpaceExtend,
      space: SpaceExtend, //usage: space-x-none
      width: WidthExtend,
      boxShadow: ShadowExtend, //usage: shadow-xs

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {
      flexDirection: ["rtl"], // Enable RTL variant for flexDirection
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

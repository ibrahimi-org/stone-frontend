import { Navbar } from "@/components/molecules/navbar/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { I18N } from "@/configs/i18next/settings";

import { GlobalLayout } from "@/contexts/GlobalLayout";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { dir } from "i18next";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--lato-font-family",
});

export async function generateStaticParams() {
  return I18N.supportedLngs.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html suppressHydrationWarning dir={dir(params.lang)} lang={params.lang}>
      <body className={cn("min-h-screen bg-primary-solid text-fg-primary font-lato antialiased", lato.variable)}>
        <GlobalLayout>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </GlobalLayout>
      </body>
    </html>
  );
}

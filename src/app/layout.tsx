import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme/provider";
import Header from "~/components/header/header";
import { Toaster } from "~/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app with Next.js, tRPC, and Drizzle",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  {
    /* hydration warnings are caused by theme provider
       because theme can only be resolved on client */
  }
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Todo App" />
      </head>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="container px-4 mx-auto">{children}</main>
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

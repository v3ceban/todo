import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import Header from "~/components/header";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app with Next.js, tRPC, and Drizzle",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Todo App" />
      </head>
      <body>
        <TRPCReactProvider>
          <div className="container px-4 mx-auto">
            <Header />
            <main>{children}</main>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

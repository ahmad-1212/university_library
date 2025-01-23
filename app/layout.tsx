import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const ibmPlexSans = localFont({
  src: [
    { path: "./fonts/IBMPLexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/IBMPLexSans-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "./fonts/IBMPLexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/IBMPLexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "./fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing universty library management solution",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  console.log(session);
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
};

export default RootLayout;

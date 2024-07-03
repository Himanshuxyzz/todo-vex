import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todovex",
  description:
    "Todovex seamlessly organizes your task and will do some cool stuff using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "bg-white text-black border-primary/40 border-solid py-4 top-0 right-0 fixed py-4 flex md:max-w-[220px] md:top-4 md:right-4",
          }}
        />
      </body>
    </html>
  );
}

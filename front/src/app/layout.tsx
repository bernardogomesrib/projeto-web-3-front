import Navbar from "@/components/navbar/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ITThreads",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "w-[99vw] bg-[]"}>
        <Navbar />
        {/* <BlueBar /> */}
        <main className="flex min-h-screen w-[99vw] flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

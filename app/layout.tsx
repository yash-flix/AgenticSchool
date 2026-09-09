import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import ProgressSync from "@/components/ProgressSync";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agent School — a free path from prompt to production agents",
  description:
    "A free, curated path through the best YouTube courses on agentic AI, plus a field track of engineers running agents in production. No sign-up, no paywall.",
  openGraph: {
    title: "Agent School",
    description:
      "A free curriculum for agentic AI, put in the order you should actually watch it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="grain antialiased">
        <ProgressSync />
        {children}
      </body>
    </html>
  );
}

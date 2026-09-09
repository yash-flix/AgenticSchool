import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
    <html lang="en" className={`${instrument.variable} ${plexMono.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}

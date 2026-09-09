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
  title: "Agent School — 10 courses that take you from prompt to production",
  description:
    "A curated, ordered path through the ten best free YouTube courses on agentic AI. Roughly 65 hours, four stages, one working agent stack at the end.",
  openGraph: {
    title: "Agent School",
    description:
      "Ten free YouTube courses on agentic AI, put in the order you should actually watch them.",
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

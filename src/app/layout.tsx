import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Love Joy Happiness | Autocolante, Bannere și Altele",
  description:
    "Cumpără din colecția noastră de autocolante frumoase, bannere și alte produse care aduc dragoste, bucurie și fericire în viața ta.",
  keywords:
    "autocolante, bannere, produse, dragoste, bucurie, fericire, e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}

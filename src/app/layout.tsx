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
  title: "Love Joy Happiness | Stickers, Banners & More",
  description:
    "Shop our collection of beautiful stickers, banners, and other merchandise that bring love, joy, and happiness to your life.",
  keywords: "stickers, banners, merchandise, love, joy, happiness, e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}

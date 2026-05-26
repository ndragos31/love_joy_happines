import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { CartProvider } from "@/lib/context/CartContext";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Love Joy Happiness | Etichete, Flyere și Accesorii Uleiuri Esențiale",
  description:
    "Cumpără din colecția noastră de autocolante frumoase, bannere și alte produse care aduc dragoste, bucurie și fericire în viața ta.",
  keywords:
    "autocolante, bannere, produse, dragoste, bucurie, fericire, e-commerce",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <CartProvider>
            <main className="pt-16">{children}</main>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

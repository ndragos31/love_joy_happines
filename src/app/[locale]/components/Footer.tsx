"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

const shopLinks = [
  { href: "/products", key: "allProducts" },
  { href: "/categories/etichete", key: "labels" },
  { href: "/categories/autocolante", key: "stickers" },
  { href: "/categories/flyere-si-pliante", key: "flyers" },
] as const;

const helpLinks = [
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
] as const;

const linkClassName = "text-background transition-colors hover:text-primary-soft";

export default function Footer() {
  const t = useTranslations("footer");
  const callout = useTranslations("home.cta");

  return (
    <footer className="rounded-t-4xl bg-foreground text-background">
      <div className="container-custom flex flex-col gap-12 pt-14 pb-8 md:pt-16">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-background/15 pb-10 md:flex-row md:items-end">
          <p className="max-w-xl font-display text-4xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
            {callout("heading")}
          </p>
          <Link
            href="/contact"
            className="group inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-background pr-2 pl-7 font-medium text-foreground transition duration-200 hover:bg-primary-soft active:scale-98"
          >
            {callout("button")}
            <span className="grid size-10 place-items-center rounded-full bg-foreground/10 transition-transform duration-200 group-hover:translate-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 flex flex-col items-start gap-4 lg:col-span-1">
            <Image
              src="/logo dreptunghi.jpg"
              alt="Love Joy Happiness"
              width={2836}
              height={676}
              sizes="140px"
              className="h-8 w-auto mix-blend-screen brightness-110 contrast-125 invert hue-rotate-180"
            />
            <p className="max-w-xs text-background/60">{t("tagline")}</p>
          </div>

          <nav aria-label={t("headings.shop")}>
            <h3 className="text-sm text-background/50">{t("headings.shop")}</h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("headings.help")}>
            <h3 className="text-sm text-background/50">{t("headings.help")}</h3>
            <ul className="mt-4 space-y-3">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm text-background/50">{t("headings.contact")}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="tel:+40750485858" className={linkClassName}>
                  +40 750 485 858
                </a>
              </li>
              <li>
                <a href="mailto:lovejoyhappinesscontact@yahoo.com" className={`[overflow-wrap:anywhere] ${linkClassName}`}>
                  lovejoyhappinesscontact<wbr />@yahoo.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/people/Love-Joy-Happiness/61571091636918/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 border-t border-background/15 pt-6 text-sm text-background/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <LanguageToggle onDark />
        </div>
      </div>
    </footer>
  );
}

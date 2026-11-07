"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/constants/navigation";
import { useCart } from "@/lib/context/CartContext";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const shipping = useTranslations("products.detail");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className="bg-foreground text-background">
        <p className="container-custom flex h-9 items-center justify-center gap-3 text-xs sm:text-sm">
          <span className="hidden md:inline">{shipping("shippingItem1")}</span>
          <span className="hidden size-1 rounded-full bg-primary-soft/60 md:block" />
          <span>{shipping("shippingItem2")}</span>
          <span className="hidden size-1 rounded-full bg-primary-soft/60 lg:block" />
          <span className="hidden lg:inline">{shipping("shippingItem3")}</span>
        </p>
      </div>

      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 rounded-full border border-line/80 bg-background pr-2 pl-4 shadow-soft sm:gap-4 sm:pl-5">
          <Link href="/" className="shrink-0">
            <Image
              src="/logo dreptunghi.jpg"
              alt="Love Joy Happiness"
              width={2836}
              height={676}
              priority
              sizes="160px"
              className="h-7 w-auto brightness-110 contrast-125 mix-blend-multiply sm:h-9"
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-sand text-foreground"
                      : "text-muted hover:bg-sand/60 hover:text-foreground"
                  }`}
                >
                  {t(item.titleKey)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>

            <Link
              href="/cart"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground pr-1.5 pl-4 text-sm font-medium text-background transition-colors duration-200 hover:bg-primary active:scale-98"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 8h14l-1 12H6L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className="hidden whitespace-nowrap sm:inline">{t("myCart")}</span>
              <span className="grid size-9 place-items-center rounded-full bg-background/15 text-xs tabular-nums">
                {totalItems}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t("menuClose") : t("menuOpen")}
              aria-expanded={isMenuOpen}
              className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:bg-sand lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                aria-hidden
              >
                <path d={isMenuOpen ? "M6 6l12 12M18 6 6 18" : "M4 9h16M4 15h16"} />
              </svg>
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="mx-auto mt-2 max-w-7xl rounded-[2rem] border border-line bg-background p-3 shadow-lift lg:hidden">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl transition-colors ${
                      isActive(item.href) ? "bg-sand" : "hover:bg-sand/60"
                    }`}
                  >
                    {t(item.titleKey)}
                    {isActive(item.href) && (
                      <span className="size-2 rounded-full bg-primary" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t border-line px-4 pt-4 pb-2 sm:hidden">
              <LanguageToggle />
            </div>
          </div>
        )}
      </header>
    </>
  );
}

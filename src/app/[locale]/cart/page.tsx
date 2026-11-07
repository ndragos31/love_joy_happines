"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "@/lib/context/CartContext";
import { getFreeQuantity, getItemEffectivePrice, hasFreeItemOffer, PAID_ITEMS_PER_FREE_ITEM } from "@/lib/utils/price";
import { useTranslations } from "next-intl";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const t = useTranslations("cart");
  const tOffer = useTranslations("freeItemOffer");

  // Shipping cost calculation
  const shipping = subtotal > 200 ? 0 : 25; // Free shipping over 200 Lei
  const total = subtotal + shipping;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <header className="container-custom pt-14 pb-10 md:pt-20 md:pb-14">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance md:text-7xl">
            {t("title")}
          </h1>
        </header>

        <div className="container-custom pb-20 md:pb-28">
          {items.length === 0 ? (
            <div className="relative overflow-hidden rounded-4xl bg-sand px-6 py-16 text-center md:py-24">
              <span className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-96 -rotate-12 rounded-full bg-primary-soft blur-2xl" />
              <div className="relative flex flex-col items-center">
                <span className="grid size-20 place-items-center rounded-full bg-surface text-primary shadow-soft">
                  <BagIcon />
                </span>
                <h2 className="mt-8 font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
                  {t("empty.heading")}
                </h2>
                <p className="mt-4 max-w-md text-lg text-pretty text-muted">
                  {t("empty.description")}
                </p>
                <Link
                  href="/products"
                  className="group mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-foreground pr-2 pl-7 font-medium text-background transition duration-200 hover:bg-primary active:scale-98"
                >
                  {t("empty.cta")}
                  <span className="grid size-10 place-items-center rounded-full bg-background/15">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <section className="lg:col-span-8">
                <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                  <h2 className="font-medium">{t("products", { count: items.length })}</h2>
                  <button
                    type="button"
                    onClick={() => clearCart()}
                    className="cursor-pointer text-sm font-medium text-muted underline decoration-foreground/20 decoration-2 underline-offset-8 transition-colors hover:text-error hover:decoration-error"
                  >
                    {t("clearCart")}
                  </button>
                </div>

                <ul className="mt-6 grid gap-4">
                  {items.map((item) => {
                    const freeQuantity = getFreeQuantity(item.product, item.quantity);

                    return (
                      <li key={item.id} className="flex gap-4 rounded-3xl bg-surface p-4 sm:gap-6 sm:p-5">
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-sand sm:size-32">
                          {item.product.images && item.product.images.length > 0 && (
                            <Image
                              src={item.product.images[0].src}
                              alt={item.product.images[0].alt || item.product.name}
                              fill
                              sizes="128px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="flex min-w-0 grow flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                href={`/products/${item.product.id}`}
                                className="leading-snug font-medium transition-colors hover:text-primary"
                              >
                                {item.product.name}
                              </Link>
                              {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                                <ul className="mt-2 flex flex-wrap gap-1.5">
                                  {Object.entries(item.selectedAttributes).map(([key, value], index) => (
                                    <li
                                      key={`${item.id}-attr-${key}-${index}`}
                                      className="rounded-full bg-sand px-2.5 py-1 text-xs text-muted"
                                    >
                                      <span className="font-medium text-foreground">{key}:</span> {value}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={t("removeItem")}
                              className="-mt-1 -mr-1 grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-error/10 hover:text-error"
                            >
                              <TrashIcon />
                            </button>
                          </div>

                          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                            <div className="inline-flex h-11 items-center rounded-full border border-line p-1">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                aria-label={t("decreaseQuantity")}
                                className="grid size-9 cursor-pointer place-items-center rounded-full transition-colors enabled:hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <MinusIcon />
                              </button>
                              <span className="min-w-10 px-1 text-center font-medium tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label={t("increaseQuantity")}
                                className="grid size-9 cursor-pointer place-items-center rounded-full transition-colors hover:bg-sand"
                              >
                                <PlusIcon />
                              </button>
                            </div>
                            <p className="font-display text-xl tabular-nums">
                              {getItemEffectivePrice(item).toFixed(2)} lei
                            </p>
                          </div>

                          {hasFreeItemOffer(item.product) && (
                            <p
                              aria-live="polite"
                              className={`mt-3 rounded-2xl px-3 py-2 text-sm font-medium ${
                                freeQuantity > 0 ? "bg-success/10 text-success" : "bg-primary-soft text-primary"
                              }`}
                            >
                              {freeQuantity > 0
                                ? tOffer("earned", { free: freeQuantity, total: item.quantity + freeQuantity })
                                : tOffer("missing", { count: PAID_ITEMS_PER_FREE_ITEM - item.quantity })}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <Link href="/products" className="group mt-8 inline-flex items-center gap-2 font-medium">
                  <ArrowLeftIcon />
                  <span className="underline decoration-foreground/20 decoration-2 underline-offset-8 transition-colors group-hover:decoration-primary">
                    {t("continueShopping")}
                  </span>
                </Link>
              </section>

              <div className="lg:col-span-4">
                <aside className="rounded-4xl bg-sand p-6 sm:p-8 lg:sticky lg:top-28 lg:p-6 xl:p-8">
                  <h2 className="font-display text-2xl font-medium">{t("summary.heading")}</h2>

                  <dl className="mt-6 grid gap-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">{t("summary.subtotal")}</dt>
                      <dd className="font-display text-lg tabular-nums">{subtotal.toFixed(2)} lei</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">{t("summary.shipping")}</dt>
                      <dd className={`font-display text-lg tabular-nums ${shipping === 0 ? "text-success" : ""}`}>
                        {shipping > 0 ? `${shipping.toFixed(2)} lei` : t("summary.shippingFree")}
                      </dd>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-line pt-5">
                      <dt className="font-medium">{t("summary.total")}</dt>
                      <dd className="font-display text-3xl font-medium tabular-nums">{total.toFixed(2)} lei</dd>
                    </div>
                  </dl>

                  <Link
                    href="/checkout"
                    className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-medium text-white transition duration-200 hover:bg-primary-hover active:scale-98"
                  >
                    {t("summary.checkout")}
                    <ArrowRightIcon />
                  </Link>

                  <p className="mt-5 text-sm text-pretty text-muted">{t("summary.vatNote")}</p>
                </aside>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M5 12h14" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
);

const BagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-9"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

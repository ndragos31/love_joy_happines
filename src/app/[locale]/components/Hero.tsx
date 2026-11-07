import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LabelScene from "./LabelScene";

export default function Hero() {
  const t = useTranslations("home.hero");
  const shipping = useTranslations("products.detail");
  const shippingItems = [
    shipping("shippingItem1"),
    shipping("shippingItem2"),
    shipping("shippingItem3"),
  ];

  return (
    <section className="container-custom grid items-center gap-12 pt-8 pb-16 md:pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-24">
      <div className="flex flex-col items-start gap-7 lg:col-span-6">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-3 text-sm text-muted">
          <span className="h-2 w-3 -rotate-12 rounded-full bg-primary" />
          {t("eyebrow")}
        </p>

        <h1 className="font-display text-5xl leading-none font-medium tracking-tight text-balance sm:text-6xl xl:text-7xl">
          {t.rich("heading", {
            accent: (chunks) => <em className="text-primary">{chunks}</em>,
          })}
        </h1>

        <p className="max-w-md text-lg leading-relaxed text-pretty text-muted">{t("tagline")}</p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/categories"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-foreground pr-2 pl-7 font-medium text-background transition duration-200 hover:bg-primary active:scale-98"
          >
            {t("exploreCollection")}
            <span className="grid size-10 place-items-center rounded-full bg-background/15 transition-transform duration-200 group-hover:translate-x-0.5">
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
          <Link
            href="/products"
            className="inline-flex h-14 items-center px-4 font-medium underline decoration-foreground/20 decoration-2 underline-offset-8 transition-colors hover:decoration-primary"
          >
            {t("allProducts")}
          </Link>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {shippingItems.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-6">
        <LabelScene
          labelNames={t.raw("labelNames") as string[]}
          caption={t("labelCaption")}
          subtitle={t("labelSubtitle")}
          miniSubtitle={t("miniLabelSubtitle")}
          sheetNote={t("sheetNote")}
          description={t("animationLabel")}
        />
      </div>
    </section>
  );
}

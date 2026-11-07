import type { Metadata } from "next";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import CategoryChips from "./components/CategoryChips";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import { getProductCategories } from "@/lib/services/woocommerce/categories";
import { getPopularProducts } from "@/lib/services/woocommerce/products";
import { Category } from "@/lib/types/category";
import { Product } from "@/lib/types/product";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home() {
  const [categories, popularProducts] = await Promise.all([
    getProductCategories({ per_page: 100 }).catch((): Category[] => []),
    getPopularProducts(8).catch((): Product[] => []),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <Hero />
        <div className="container-custom">
          <CategoryChips categories={categories} />
        </div>
        {popularProducts.length > 0 && <PopularSection products={popularProducts} />}
        <CategoriesSection categories={categories} />
        <StorySection />
        <WhyUsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
  link,
}: {
  title: string;
  subtitle: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-pretty text-muted">{subtitle}</p>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 font-medium"
        >
          <span className="underline decoration-line decoration-2 underline-offset-8 transition-colors group-hover:decoration-primary">
            {link.label}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 transition-transform group-hover:translate-x-0.5"
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
        </Link>
      )}
    </div>
  );
}

function CategoriesSection({ categories }: { categories: Category[] }) {
  const t = useTranslations("home.categories");

  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <SectionHeading
          title={t("heading")}
          subtitle={t("subheading")}
          link={{ href: "/products", label: t("allProducts") }}
        />
        <Categories categories={categories} />
      </div>
    </section>
  );
}

function PopularSection({ products }: { products: Product[] }) {
  const t = useTranslations("home.popular");

  return (
    <section className="pt-16 md:pt-24">
      <div className="container-custom">
        <SectionHeading
          title={t("heading")}
          subtitle={t("subheading")}
          link={{ href: "/products", label: t("viewAll") }}
        />
        <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12 lg:overflow-visible lg:px-0 xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="w-64 shrink-0 snap-start lg:w-auto">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StorySection() {
  const t = useTranslations("home.story");
  const about = useTranslations("legal.about");

  return (
    <section className="overflow-hidden bg-sand py-20 md:py-28">
      <div className="container-custom grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-4/5 overflow-hidden rounded-4xl shadow-lift">
            <Image
              src="/aboutus.jpeg"
              alt={about("story.imageAlt")}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-6 rotate-3 rounded-3xl bg-primary px-6 py-5 text-white shadow-lift sm:-right-8">
            <p className="font-display text-3xl font-medium">{t("eyebrow")}</p>
            <p className="mt-1 text-sm text-white/80">Love Joy Happiness</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="flex items-center gap-2.5 text-sm font-medium text-primary">
            <span className="h-2 w-3 -rotate-12 rounded-full bg-primary" />
            {about("story.heading")}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
            {about("mission.text")}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            {about("story.p1")}
          </p>
          <Link
            href="/about"
            className="mt-9 inline-flex h-13 items-center rounded-full border border-foreground/20 px-7 font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

const whyUsKeys = ["quality", "delivery", "satisfaction", "prices"] as const;

function WhyUsSection() {
  const t = useTranslations("legal.about.whyUs");

  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <h2 className="max-w-3xl font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
          {t("heading")} <span className="text-primary italic">Love Joy Happiness</span>?
        </h2>
        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {whyUsKeys.map((key, index) => (
            <li key={key} className="border-t border-foreground/15 pt-6">
              <span className="font-display text-sm text-primary tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium">{t(`${key}.heading`)}</h3>
              <p className="mt-3 leading-relaxed text-pretty text-muted">{t(`${key}.text`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const stickerTilts = ["-rotate-2 md:mt-4", "rotate-1", "-rotate-1 md:mt-9"];

function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const locale = useLocale();
  const items = t.raw("items") as { author: string; quote: string }[];
  const [openQuote, closeQuote] = locale === "ro" ? ["„", "”"] : ["“", "”"];

  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted">{t("subheading")}</p>
        </div>

        <ul className="mt-12 grid max-w-2xl items-start gap-10 lg:max-w-none lg:grid-cols-3 lg:gap-7">
          {items.map((item, index) => (
            <li
              key={item.author}
              className={`relative rounded-2xl bg-surface px-7 pt-8 pb-6 shadow-lift transition duration-500 ease-out before:pointer-events-none before:absolute before:inset-2 before:rounded-xl before:border before:border-dashed before:border-muted/30 after:absolute after:-top-2.5 after:left-1/2 after:h-5.5 after:w-18.5 after:-translate-x-1/2 after:-rotate-2 after:rounded-sm after:bg-primary/15 hover:-translate-y-1.5 hover:rotate-0 ${
                stickerTilts[index % stickerTilts.length]
              }`}
            >
              <figure className="flex flex-col gap-5">
                <blockquote className="font-display text-lg leading-relaxed text-pretty">
                  {openQuote}
                  {item.quote}
                  {closeQuote}
                </blockquote>
                <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3.5">
                  <span className="font-script text-3xl leading-none text-primary">{item.author}</span>
                  <span className="flex gap-0.5 text-primary" aria-label="5/5">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <svg key={starIndex} className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                      </svg>
                    ))}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

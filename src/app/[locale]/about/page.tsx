import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductCategories } from "@/lib/services/woocommerce/categories";
import { Category } from "@/lib/types/category";

// Etichete, Flyere, Tricouri, Autocolante, Agende
const SHOWCASE_CATEGORY_IDS = [22, 24, 30, 23, 29];
const beliefKeys = ["mission", "values", "vision"] as const;

export default async function AboutPage() {
  const categories = await getProductCategories({ per_page: 100 }).catch((): Category[] => []);
  const showcaseCategories = SHOWCASE_CATEGORY_IDS.map((id) =>
    categories.find((category) => category.id === id)
  ).filter((category): category is Category => Boolean(category?.image?.src));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow pb-20 md:pb-28">
        <AboutHeader />
        <PhotoMosaic />
        <Timeline />
        {showcaseCategories.length > 0 && <Showcase categories={showcaseCategories} />}
        <Beliefs />
      </main>
      <Footer />
    </div>
  );
}

function AboutHeader() {
  const t = useTranslations("legal.about");
  const home = useTranslations("home.story");

  return (
    <header className="container-custom grid items-end gap-8 pt-14 pb-12 md:pt-20 md:pb-16 lg:grid-cols-12">
      <div className="flex flex-col items-start gap-5 lg:col-span-5">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-3 text-sm text-muted">
          <span className="h-2 w-3 -rotate-12 rounded-full bg-primary" />
          {home("eyebrow")}
        </p>
        <h1 className="font-display text-6xl leading-none font-medium tracking-tight text-balance md:text-8xl">
          {t("heading")}
        </h1>
      </div>
      <p className="font-display text-2xl leading-snug text-pretty lg:col-span-6 lg:col-start-7 lg:text-3xl">
        {t("story.lead")}
      </p>
    </header>
  );
}

function PhotoMosaic() {
  const t = useTranslations("legal.about");

  return (
    <div className="container-custom grid grid-cols-2 gap-3 md:h-105 md:grid-cols-[1fr_1.6fr_1fr] md:gap-4">
      <div className="relative aspect-4/5 overflow-hidden rounded-4xl bg-sand md:aspect-auto">
        <Image
          src="/aboutus.jpeg"
          alt={t("story.imageAlt")}
          fill
          priority
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="relative order-first col-span-2 aspect-video overflow-hidden rounded-4xl bg-sand md:order-none md:col-span-1 md:aspect-auto">
        <Image
          src="/images/roller-bottles-row.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
        />
      </div>
      <div className="relative aspect-4/5 overflow-hidden rounded-4xl bg-sand md:aspect-auto">
        <Image
          src="/images/dropper-lavender.jpg"
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
      <h2 className="font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      <p className="max-w-md text-lg text-pretty text-muted">{subtitle}</p>
    </div>
  );
}

function Timeline() {
  const t = useTranslations("legal.about.timeline");
  const steps = t.raw("steps") as { when: string; title: string; text: string }[];

  return (
    <section className="container-custom pt-20 md:pt-28">
      <SectionTitle title={t("heading")} subtitle={t("subheading")} />
      <ol className="mt-10 grid gap-y-10 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col gap-2.5 pt-8 pr-6">
            <span
              className={`absolute -top-1.5 left-0 size-3 rounded-full border-2 border-primary ${
                index === 0 ? "bg-primary" : "bg-background"
              }`}
            />
            <span className="font-display text-primary tabular-nums">{step.when}</span>
            <h3 className="font-display text-2xl leading-tight font-medium">{step.title}</h3>
            <p className="leading-relaxed text-pretty text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Showcase({ categories }: { categories: Category[] }) {
  const t = useTranslations("legal.about.products");
  const count = useTranslations("home.categories");

  return (
    <section className="container-custom pt-20 md:pt-28">
      <SectionTitle title={t("heading")} subtitle={t("subheading")} />
      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/categories/${category.slug}`}
              className="group relative flex aspect-3/4 items-end overflow-hidden rounded-3xl p-4 text-white"
            >
              <Image
                src={category.image.src}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/65 via-45% to-transparent to-85%" />
              <span className="relative">
                <span className="block font-display text-xl leading-tight font-medium">
                  {category.name}
                </span>
                <span className="mt-1 block text-xs opacity-80">
                  {count("productCount", { count: category.count })}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Beliefs() {
  const t = useTranslations("legal.about");

  return (
    <section className="container-custom grid gap-3 pt-20 md:pt-28 lg:grid-cols-3">
      {beliefKeys.map((key) => (
        <div key={key} className="flex flex-col gap-3 rounded-3xl bg-surface p-7">
          <h3 className="text-sm font-semibold text-primary">{t(`${key}.heading`)}</h3>
          <p className="font-display text-xl leading-snug text-pretty md:text-2xl">
            {t(`${key}.text`)}
          </p>
        </div>
      ))}
    </section>
  );
}

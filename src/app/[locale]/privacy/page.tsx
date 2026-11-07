"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sectionKeys = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"];
const paragraphClassName = "mt-4 max-w-prose leading-relaxed text-pretty text-muted";

export default function PrivacyPage() {
  const t = useTranslations("legal.privacy");
  const locale = useLocale();
  const sections = sectionKeys.map((sectionKey, index) => ({
    key: sectionKey,
    id: `section-${index + 1}`,
    number: String(index + 1).padStart(2, "0"),
    title: t(`${sectionKey}.heading`).replace(/^\d+\.\s*/, ""),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <header className="container-custom pt-14 pb-10 md:pt-20 md:pb-14">
          <h1 className="font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-7xl">
            {t("heading")}
          </h1>
          <p className="mt-5 text-lg text-muted">
            {t("lastUpdated")} {new Date().toLocaleDateString(locale === "en" ? "en-GB" : "ro-RO")}
          </p>
        </header>

        <div className="container-custom grid gap-12 pb-20 md:pb-28 lg:grid-cols-12">
          <nav aria-label={t("heading")} className="hidden lg:col-span-4 lg:block">
            <ol className="space-y-3 text-sm text-muted lg:sticky lg:top-28">
              {sections.map((section) => (
                <li key={section.key}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-baseline gap-3 transition-colors hover:text-foreground"
                  >
                    <span className="font-display text-primary tabular-nums">{section.number}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="lg:col-span-8 lg:col-start-5">
            {sections.map((section) => (
              <section
                key={section.key}
                id={section.id}
                className="scroll-mt-28 border-t border-line pt-8 pb-10"
              >
                <h2 className="font-display text-2xl font-medium md:text-3xl">
                  <span className="mb-2 block text-base text-primary tabular-nums">
                    {section.number}
                  </span>
                  {section.title}
                </h2>

                {t.has(`${section.key}.text`) && (
                  <p className={paragraphClassName}>{t(`${section.key}.text`)}</p>
                )}

                {t.has(`${section.key}.items`) && (
                  <>
                    <p className={paragraphClassName}>{t(`${section.key}.intro`)}</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-primary">
                      {(t.raw(`${section.key}.items`) as string[]).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                {section.key === "s10" && (
                  <ul className="mt-6 space-y-2 rounded-4xl bg-sand p-6 text-foreground sm:p-8">
                    <li className="[overflow-wrap:anywhere]">{t("s10.emailItem")}</li>
                    <li>
                      {t("s10.contactLinkPrefix")}{" "}
                      <Link
                        href="/contact"
                        className="text-primary underline underline-offset-4 transition-colors hover:text-primary-hover"
                      >
                        {t("s10.contactLinkLabel")}
                      </Link>
                    </li>
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

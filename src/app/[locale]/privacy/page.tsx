"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  const t = useTranslations("legal.privacy");
  const locale = useLocale();
  const s2Items = t.raw("s2.items") as string[];
  const s3Items = t.raw("s3.items") as string[];
  const s7Items = t.raw("s7.items") as string[];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container-custom pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">
              {t("heading")}
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s1.heading")}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("s1.text")}
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s2.heading")}
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  {t("s2.intro")}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  {s2Items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s3.heading")}
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  {t("s3.intro")}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  {s3Items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s4.heading")}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("s4.text")}
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s5.heading")}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("s5.text")}
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s6.heading")}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("s6.text")}
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s7.heading")}
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  {t("s7.intro")}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  {s7Items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s8.heading")}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("s8.text")}
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s9.heading")}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("s9.text")}
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {t("s10.heading")}
                </h2>
                <p className="text-foreground leading-relaxed">
                  {t("s10.text")}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground mt-4">
                  <li>{t("s10.emailItem")}</li>
                  <li>
                    {t("s10.contactLinkPrefix")}{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      {t("s10.contactLinkLabel")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="text-center mt-8 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-foreground">
                  {t("lastUpdated")} {new Date().toLocaleDateString(locale === "en" ? "en-GB" : "ro-RO")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

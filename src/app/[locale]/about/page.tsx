"use client";

import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function AboutPage() {
  const t = useTranslations("legal.about");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 md:pt-24 pb-16">
        <section className="py-8">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("heading")}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl font-semibold mb-6 text-primary">
                  {t("story.heading")}
                </h2>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  {t("story.p1")}
                </p>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  {t("story.p2")}
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  {t("story.p3")}
                </p>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/aboutus.jpeg"
                    alt={t("story.imageAlt")}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("mission.heading")}</h3>
                <p className="text-foreground/80">
                  {t("mission.text")}
                </p>
              </div>

              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("values.heading")}</h3>
                <p className="text-foreground/80">
                  {t("values.text")}
                </p>
              </div>

              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-accent dark:text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("vision.heading")}</h3>
                <p className="text-foreground/80">
                  {t("vision.text")}
                </p>
              </div>
            </div>

            {/* Title with decorative elements */}
            <div className="text-center mb-12 relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-16 h-16 bg-secondary/5 rounded-full blur-lg"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-20 h-20 bg-accent/5 rounded-full blur-xl"></div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground relative">
                {t("whyUs.heading")}{" "}
                <span className="text-primary">Love Joy Happiness</span>
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="bg-gray-light dark:bg-gray-800 p-8 rounded-lg mb-16 relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
                <div className="flex items-start space-x-4 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">
                      {t("whyUs.quality.heading")}
                    </h3>
                    <p className="text-foreground/70">
                      {t("whyUs.quality.text")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">
                      {t("whyUs.delivery.heading")}
                    </h3>
                    <p className="text-foreground/70">
                      {t("whyUs.delivery.text")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">
                      {t("whyUs.satisfaction.heading")}
                    </h3>
                    <p className="text-foreground/70">
                      {t("whyUs.satisfaction.text")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">
                      {t("whyUs.prices.heading")}
                    </h3>
                    <p className="text-foreground/70">
                      {t("whyUs.prices.text")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

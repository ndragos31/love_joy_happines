"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function ContactPage() {
  const t = useTranslations("legal.contact");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(result.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <header className="container-custom pt-14 pb-10 md:pt-20 md:pb-14">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance md:text-7xl">
            {t("heading")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-pretty text-muted">{t("form.intro")}</p>
        </header>

        <div className="container-custom grid gap-4 pb-20 md:pb-28 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <a
              href="tel:+40750485858"
              className="group flex items-center gap-4 rounded-3xl bg-surface p-5 transition-colors hover:bg-sand sm:p-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                <ContactIcon path="M4 5.5C4 4.7 4.7 4 5.5 4h2.6c.6 0 1.2.4 1.4 1l1.1 3.2c.2.6 0 1.3-.6 1.7l-1.5 1a11 11 0 0 0 4.6 4.6l1-1.5c.4-.6 1.1-.8 1.7-.6l3.2 1.1c.6.2 1 .8 1 1.4v2.6c0 .8-.7 1.5-1.5 1.5h-1C9.6 20 4 14.4 4 6.5v-1Z" />
              </span>
              <span className="min-w-0 grow">
                <span className="block text-sm text-muted">{t("info.phoneHeading")}</span>
                <span className="mt-0.5 block font-display text-xl font-medium">+40 750 485 858</span>
              </span>
              <ArrowIcon />
            </a>

            <a
              href="mailto:lovejoyhappinesscontact@yahoo.com"
              className="group flex items-center gap-4 rounded-3xl bg-surface p-5 transition-colors hover:bg-sand sm:p-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                <ContactIcon path="M4 7.5 12 13l8-5.5M5.5 19h13c.8 0 1.5-.7 1.5-1.5v-11c0-.8-.7-1.5-1.5-1.5h-13C4.7 5 4 5.7 4 6.5v11c0 .8.7 1.5 1.5 1.5Z" />
              </span>
              <span className="min-w-0 grow">
                <span className="block text-sm text-muted">{t("info.emailHeading")}</span>
                <span className="mt-0.5 block font-display text-base font-medium [overflow-wrap:anywhere] sm:text-lg">
                  lovejoyhappinesscontact<wbr />@yahoo.com
                </span>
              </span>
              <ArrowIcon />
            </a>

            <a
              href="https://www.facebook.com/people/Love-Joy-Happiness/61571091636918/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl bg-surface p-5 transition-colors hover:bg-sand sm:p-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </span>
              <span className="min-w-0 grow">
                <span className="block text-sm text-muted">{t("social.heading")}</span>
                <span className="mt-0.5 block font-display text-xl font-medium">Facebook</span>
              </span>
              <ArrowIcon />
            </a>

            <figure className="relative min-h-80 grow overflow-hidden rounded-4xl bg-sand">
              <Image
                src="/images/dropper-cream.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 font-display text-2xl leading-snug text-pretty text-white sm:p-8">
                &ldquo;{t("info.quote1")}&rdquo;
              </figcaption>
            </figure>
          </div>

          <div className="rounded-4xl bg-surface p-6 sm:p-10 lg:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
              {t("form.heading")}
            </h2>
            <p className="mt-3 text-muted">{t("info.quote2")}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    {t("form.nameLabelText")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    placeholder={t("form.namePlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    {t("form.emailLabelText")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  {t("form.messageLabelText")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  className={`${inputClassName} h-auto resize-y py-3`}
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 font-medium text-white transition duration-200 hover:bg-primary-hover active:scale-98 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </button>

              {submitSuccess && (
                <p role="status" className="rounded-2xl bg-success/10 px-4 py-3 text-success">
                  {t("form.successMessage")}
                </p>
              )}

              {submitError && (
                <p role="alert" className="rounded-2xl bg-error/10 px-4 py-3 text-error">
                  {t("form.errorMessage")}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const inputClassName =
  "h-12 w-full rounded-2xl border border-line bg-background px-4 transition outline-none placeholder:text-muted/70 focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary-soft";

const ContactIcon = ({ path }: { path: string }) => (
  <svg
    className="size-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d={path} />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

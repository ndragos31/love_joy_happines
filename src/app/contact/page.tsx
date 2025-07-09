"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function ContactPage() {
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

    try {
      // Here you would implement your email sending logic
      // For example using a backend API endpoint or email service
      // Example with fetch:
      /*
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: "lovejoyhappinesscontact@yahoo.com"
        }),
      });

      if (!response.ok) throw new Error('Failed to send email');
      */

      // For now, simulating the email sending
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-8">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Contactează-ne
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  Trimite-ne un mesaj
                </h2>
                <p className="text-foreground/80 mb-6">
                  Ai întrebări, sugestii sau dorești să plasezi o comandă
                  personalizată? Completează formularul de mai jos și te vom
                  contacta cât mai curând.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Nume complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800"
                      placeholder="Numele tău complet"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800"
                      placeholder="email@exemplu.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-1"
                    >
                      Mesaj
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800"
                      placeholder="Scrie-ne mesajul tău aici..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    {isSubmitting ? "Se trimite..." : "Trimite mesajul"}
                  </button>

                  {submitSuccess && (
                    <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md mt-4">
                      Mesajul tău a fost trimis cu succes! Te vom contacta în
                      curând.
                    </div>
                  )}

                  {submitError && (
                    <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md mt-4">
                      A apărut o eroare la trimiterea mesajului. Te rugăm să
                      încerci din nou.
                    </div>
                  )}
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  Informații de contact
                </h2>

                <div className="bg-gray-light dark:bg-gray-800 rounded-lg p-6 mb-6">
                  <div className="flex items-start mb-8">
                    <div className="bg-primary/20 p-2 rounded-full mr-4">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <p className="text-foreground/80">+40 750 485 858</p>
                    </div>
                  </div>

                  <div className="flex items-start mb-8">
                    <div className="bg-primary/20 p-2 rounded-full mr-4">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-foreground/80">
                        lovejoyhappinesscontact@yahoo.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between flex-grow">
                  <Image
                    src="/logo dreptunghi.jpg"
                    alt="Love Joy Happiness Logo"
                    width={400}
                    height={120}
                    className="object-contain mb-8"
                    priority
                  />
                  <div className="w-full bg-primary/5 rounded-lg p-6">
                    <p className="text-center text-foreground/80 italic mb-2">
                      &ldquo;Creăm momente de fericire și bucurie pentru fiecare
                      client&rdquo;
                    </p>
                    <p className="text-center text-foreground/80 italic">
                      &ldquo;Fiecare comandă este realizată cu dragoste și
                      atenție la detalii&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-light dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Urmărește-ne
              </h2>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.facebook.com/people/Love-Joy-Happiness/61571091636918/"
                  className="bg-white dark:bg-gray-700 p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

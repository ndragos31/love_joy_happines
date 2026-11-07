"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/context/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface OrderData {
  orderNumber: string;
  customerName: string;
  customerType?: string;
  companyName?: string;
  cui?: string;
  regCom?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  items: Array<{
    name: string;
    quantity: number;
    freeQuantity?: number;
    price: number;
    attributes?: Record<string, string>;
  }>;
  subtotal: number;
  discount?: number;
  shipping: number;
  total: number;
  promoCode?: string;
  paymentMethod: string;
}

export default function SuccessPage() {
  const t = useTranslations("checkout");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const { clearCart } = useCart();
  const [emailsSent, setEmailsSent] = useState(false);
  const [cartCleared, setCartCleared] = useState(false);

  // Send emails only once
  useEffect(() => {
    const sendOrderEmails = async () => {
      try {
        // Get order data from sessionStorage
        const pendingOrderData = sessionStorage.getItem("pendingOrder");

        if (pendingOrderData && !emailsSent) {
          const orderData: OrderData = JSON.parse(pendingOrderData);

          // Send order emails
          const response = await fetch("/api/send-order-emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...orderData, locale }),
          });

          if (response.ok) {
            await response.json(); // Consume response
            setEmailsSent(true);

            // Clear cart after successful email sending
            if (!cartCleared) {
              clearCart();
              setCartCleared(true);
            }

            // Remove order data from sessionStorage after successful email send
            sessionStorage.removeItem("pendingOrder");
          } else {
            await response.text(); // Consume response
            // Email sending failed - could log to error service in production
          }
        } else {
          if (!pendingOrderData) {
            // Clear cart anyway as fallback for card payments
            if (!cartCleared) {
              clearCart();
              setCartCleared(true);
            }
          }
        }
      } catch {
        // Error sending emails - could log to error service in production
      }
    };

    // Only send emails if not already sent
    if (!emailsSent) {
      sendOrderEmails();
    }
  }, [emailsSent, cartCleared, clearCart, locale]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <div className="container-custom pt-10 pb-20 md:pt-16 md:pb-28">
          <section className="relative mx-auto max-w-3xl overflow-hidden rounded-4xl bg-sand px-6 py-14 text-center sm:px-12 md:py-20">
            <span className="pointer-events-none absolute -top-24 -right-24 h-72 w-96 -rotate-12 rounded-full bg-primary-soft blur-2xl" />
            <div className="relative flex flex-col items-center">
              <span className="grid size-24 place-items-center rounded-full bg-success/10 text-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h1 className="mt-8 font-display text-4xl font-medium tracking-tight text-balance md:text-6xl">
                {t("success.heading")}
              </h1>
              <p className="mt-5 max-w-lg text-lg text-pretty text-muted">
                {t("success.message")}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="/products"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-8 font-medium text-background transition duration-200 hover:bg-primary active:scale-98"
                >
                  {t("success.continueShopping")}
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
                </Link>
                <Link
                  href="/"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-foreground/20 px-8 font-medium transition-colors duration-200 hover:border-foreground"
                >
                  {tNav("home")}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

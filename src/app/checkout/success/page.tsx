"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface OrderData {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  items: Array<{
    name: string;
    quantity: number;
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
            body: JSON.stringify(orderData),
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
  }, [emailsSent, cartCleared, clearCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom py-8">
          <div className="max-w-2xl mx-auto bg-gray-light dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-green-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4">
                Plată procesată cu succes!
              </h1>
              <p className="text-foreground/70 mb-8">
                Vă mulțumim pentru comandă. Veți primi un email de confirmare în
                curând.
              </p>
              <Link
                href="/products"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Continuă cumpărăturile
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

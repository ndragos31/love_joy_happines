"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "@/lib/context/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import Image from "next/image";

// Payment form component
function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔵 Starting payment submission...");

    if (!stripe || !elements) {
      console.warn("⚠️ Stripe or Elements not loaded");
      return;
    }

    setProcessing(true);
    setError(null);

    console.log("🔄 Submitting payment details...");
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error("❌ Error submitting payment details:", submitError);
      setError(
        submitError.message || "A apărut o eroare la procesarea plății."
      );
      setProcessing(false);
      return;
    }

    console.log("✅ Payment details submitted successfully");
    console.log("🔄 Confirming payment...");

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (confirmError) {
      console.error("❌ Error confirming payment:", confirmError);
      setError(
        confirmError.message || "A apărut o eroare la procesarea plății."
      );
      setProcessing(false);
      return;
    }

    console.log("✅ Payment confirmed successfully");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {processing ? "Se procesează..." : "Plătește"}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { items, subtotal, clearCart, removeItem } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "ramburs">(
    "ramburs"
  );
  const [formData, setFormData] = useState({
    // Shipping information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
    postalCode: "",
    // Payment information
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderItems, setOrderItems] = useState<typeof items>([]);
  const [finalSubtotal, setFinalSubtotal] = useState<number>(0);
  const [finalShipping, setFinalShipping] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);

  // Shipping cost calculation - fixed standard shipping
  const getShippingCost = () => {
    if (subtotal > 200) return 0; // Free shipping over 200 Lei
    return 15; // Standard shipping cost
  };

  const shipping = getShippingCost();
  const total = subtotal + shipping;

  useEffect(() => {
    if (step === 2 && paymentMethod === "card") {
      console.log("🔵 Initializing payment intent...");
      console.log("💰 Total amount:", total);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Received client secret from server");
          setClientSecret(data.clientSecret);
        })
        .catch((err) => {
          console.error("❌ Error loading Stripe:", err);
          console.error("Error details:", {
            message: err instanceof Error ? err.message : "Unknown error",
            stack: err instanceof Error ? err.stack : undefined,
          });
        });
    }
  }, [step, total, paymentMethod]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle autofill
  useEffect(() => {
    const interval = setInterval(() => {
      const autofillInputs = document.querySelectorAll(
        "input:-webkit-autofill"
      );
      autofillInputs.forEach((input) => {
        const inputElement = input as HTMLInputElement;
        if (inputElement.value && inputElement.name) {
          setFormData((prev) => {
            if (
              prev[inputElement.name as keyof typeof prev] !==
              inputElement.value
            ) {
              return {
                ...prev,
                [inputElement.name]: inputElement.value,
              };
            }
            return prev;
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sendOrderEmails = useCallback(async () => {
    try {
      const orderDetails = {
        orderNumber,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        county: formData.county,
        postalCode: formData.postalCode,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: Number(item.product.price),
        })),
        subtotal,
        shipping,
        total,
        paymentMethod: paymentMethod === "card" ? "Card" : "Ramburs",
      };

      const response = await fetch("/api/send-order-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to send order emails");
      }

      await response.json();
    } catch (error) {
      console.error("Failed to send order confirmation emails:", error);
    }
  }, [
    orderNumber,
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.phone,
    formData.address,
    formData.city,
    formData.county,
    formData.postalCode,
    items,
    subtotal,
    shipping,
    total,
    paymentMethod,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && paymentMethod === "ramburs") {
      // Generate order number before setting step to 3
      const uniqueId = uuidv4();
      const orderPrefix = "LJH";
      const year = new Date().getFullYear();
      const newOrderNumber = `${orderPrefix}-${uniqueId.slice(0, 8)}-${year}`;
      setOrderNumber(newOrderNumber);
      // Store current cart items and totals
      setOrderItems([...items]);
      setFinalSubtotal(subtotal);
      setFinalShipping(shipping);
      setFinalTotal(total);
      // Then set step to 3
      setStep(3);
    }
  };

  // Separate useEffect for handling order completion actions
  // Use a ref to track if emails have been sent to prevent duplicates
  const emailsSentRef = useRef(false);

  useEffect(() => {
    if (step === 3 && orderNumber && !emailsSentRef.current) {
      console.log(
        `🔵 Order completed, sending emails for order #${orderNumber}`
      );
      emailsSentRef.current = true;

      // Send confirmation emails
      sendOrderEmails()
        .then(() => {
          console.log(`✅ Emails sent successfully for order #${orderNumber}`);
          // Clear the cart only after emails are sent
          clearCart();
        })
        .catch((error) => {
          console.error(
            `❌ Failed to send emails for order #${orderNumber}:`,
            error
          );
          // Reset the flag so emails can be retried if needed
          emailsSentRef.current = false;
        });
    }
  }, [step, orderNumber, clearCart, sendOrderEmails]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 cursor-pointer">
            Finalizare Comandă
          </h1>

          {/* Checkout Steps */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
              <div
                className={`text-center ${
                  step >= 1
                    ? "text-primary font-semibold"
                    : "text-foreground/50"
                }`}
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    step >= 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  1
                </div>
                <span className="text-sm mt-1 block">Livrare</span>
              </div>
              <div
                className={`text-center ${
                  step >= 2
                    ? "text-primary font-semibold"
                    : "text-foreground/50"
                }`}
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    step >= 2
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  2
                </div>
                <span className="text-sm mt-1 block">Plată</span>
              </div>
              <div
                className={`text-center ${
                  step >= 3
                    ? "text-primary font-semibold"
                    : "text-foreground/50"
                }`}
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    step >= 3
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  3
                </div>
                <span className="text-sm mt-1 block">Confirmare</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-gray-light dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold">
                      Informații de livrare
                    </h2>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium mb-1"
                        >
                          Prenume <span className="text-[#ff6b6b]">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium mb-1"
                        >
                          Nume <span className="text-[#ff6b6b]">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email <span className="text-[#ff6b6b]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={(e) => {
                            console.log(
                              "Email field blur event:",
                              e.target.value
                            );
                            handleChange(e);
                          }}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-1"
                        >
                          Telefon <span className="text-[#ff6b6b]">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium mb-1"
                      >
                        Adresă <span className="text-[#ff6b6b]">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium mb-1"
                        >
                          Oraș <span className="text-[#ff6b6b]">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="county"
                          className="block text-sm font-medium mb-1"
                        >
                          Județ <span className="text-[#ff6b6b]">*</span>
                        </label>
                        <input
                          type="text"
                          id="county"
                          name="county"
                          value={formData.county}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium mb-1"
                        >
                          Cod Poștal <span className="text-[#ff6b6b]">*</span>
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Link
                        href="/cart"
                        className="text-primary hover:underline flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        Înapoi la coș
                      </Link>
                      <button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors cursor-pointer"
                      >
                        Continuă la plată
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="bg-gray-light dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold">Metodă de plată</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4 mb-8">
                      <label className="flex items-center p-4 border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer hover:border-[#ff6b6b] transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) =>
                            setPaymentMethod(
                              e.target.value as "card" | "ramburs"
                            )
                          }
                          className="mr-3"
                        />
                        <div className="flex-grow">
                          <p className="font-medium">Card bancar</p>
                          <p className="text-sm text-foreground/70">
                            Plătește în siguranță cu cardul tău
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#ff6b6b]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </label>

                      <label className="flex items-center p-4 border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer hover:border-[#ff6b6b] transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="ramburs"
                          checked={paymentMethod === "ramburs"}
                          onChange={(e) =>
                            setPaymentMethod(
                              e.target.value as "card" | "ramburs"
                            )
                          }
                          className="mr-3"
                        />
                        <div className="flex-grow">
                          <p className="font-medium">
                            Plată la livrare (Ramburs)
                          </p>
                          <p className="text-sm text-foreground/70">
                            Plătește la primirea coletului
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#ff6b6b]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </label>
                    </div>

                    {paymentMethod === "card" && clientSecret && (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: {
                            theme: "stripe",
                            variables: {
                              colorPrimary: "#ff6b6b",
                            },
                          },
                        }}
                      >
                        <CheckoutForm
                          onSuccess={() => {
                            // Generate order number for card payments
                            const uniqueId = uuidv4();
                            const orderPrefix = "LJH";
                            const year = new Date().getFullYear();
                            const newOrderNumber = `${orderPrefix}-${uniqueId.slice(0, 8)}-${year}`;
                            setOrderNumber(newOrderNumber);
                            // Store current cart items and totals
                            setOrderItems([...items]);
                            setFinalSubtotal(subtotal);
                            setFinalShipping(shipping);
                            setFinalTotal(total);
                            // Then set step to 3
                            setStep(3);
                          }}
                        />
                      </Elements>
                    )}

                    {paymentMethod === "ramburs" && (
                      <form onSubmit={handleSubmit} className="mt-6">
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-primary hover:underline flex items-center cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                              />
                            </svg>
                            Înapoi la livrare
                          </button>
                          <button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors cursor-pointer"
                          >
                            Finalizează comanda
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-gray-light dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold">
                      Confirmare comandă
                    </h2>
                  </div>
                  <div className="p-6 text-center">
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
                    <h3 className="text-2xl font-semibold mb-2">
                      Mulțumim pentru comandă!
                    </h3>
                    <p className="text-foreground/70 mb-6">
                      Comanda ta a fost plasată cu succes și este în curs de
                      procesare. Vei primi un email de confirmare în curând.
                    </p>

                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-6 max-w-md mx-auto">
                      <p className="font-semibold">Număr comandă:</p>
                      <p className="text-foreground/70 mb-2">{orderNumber}</p>
                      <p className="font-semibold">Total:</p>
                      <p className="text-foreground/70">
                        {finalTotal.toFixed(2)} lei
                      </p>
                    </div>

                    <Link
                      href="/products"
                      className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors inline-block"
                    >
                      Continuă cumpărăturile
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-light dark:bg-gray-800 rounded-lg overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold">Sumar comandă</h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {(step === 3 ? orderItems : items).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <Link
                          href={`/products/${item.id}`}
                          className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden hover:opacity-80 transition-opacity"
                        >
                          {item.product.images &&
                          item.product.images.length > 0 ? (
                            <Image
                              src={item.product.images[0].src}
                              alt={
                                item.product.images[0].alt || item.product.name
                              }
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                              No image
                            </div>
                          )}
                        </Link>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/products/${item.id}`}
                              className="text-sm font-medium truncate hover:text-primary transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="flex items-center gap-2">
                              <span className="text-sm whitespace-nowrap">
                                {(
                                  Number(item.product.price) * item.quantity
                                ).toFixed(2)}{" "}
                                lei
                              </span>
                              {step < 3 && (
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
                                  title="Elimină produsul"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            Cantitate: {item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Subtotal</span>
                      <span>
                        {step === 3
                          ? finalSubtotal.toFixed(2)
                          : subtotal.toFixed(2)}{" "}
                        lei
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-foreground/70">
                        Transport{" "}
                        {(step === 3 ? finalShipping : shipping) === 0 && (
                          <span className="text-green-600 dark:text-green-500 text-xs ml-1">
                            (Gratuit)
                          </span>
                        )}
                      </span>
                      <span>
                        {(step === 3 ? finalShipping : shipping) === 0
                          ? "Gratuit"
                          : `${(step === 3 ? finalShipping : shipping).toFixed(2)} lei`}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">
                        {step === 3 ? finalTotal.toFixed(2) : total.toFixed(2)}{" "}
                        lei
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

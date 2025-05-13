"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "@/lib/context/CartContext";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { items, subtotal } = useCart();
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
    // Shipping method
    shippingMethod: "standard",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  // Shipping cost calculation
  const shipping = subtotal > 200 ? 0 : 15; // Free shipping over 200 Lei
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
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

                    <div className="mb-6">
                      <p className="block text-sm font-medium mb-2">
                        Metodă de livrare
                      </p>
                      <div className="space-y-3">
                        <label className="flex items-center p-3 border border-gray-300 dark:border-gray-700 rounded-md">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === "standard"}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">Livrare standard</p>
                            <p className="text-foreground/70 text-sm">
                              2-4 zile lucrătoare
                            </p>
                          </div>
                          <span className="ml-auto">15 lei</span>
                        </label>
                        <label className="flex items-center p-3 border border-gray-300 dark:border-gray-700 rounded-md">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === "express"}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">Livrare rapidă</p>
                            <p className="text-foreground/70 text-sm">
                              1-2 zile lucrătoare
                            </p>
                          </div>
                          <span className="ml-auto">25 lei</span>
                        </label>
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
                    <h2 className="text-xl font-semibold">
                      Informații de plată
                    </h2>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                      <label
                        htmlFor="cardName"
                        className="block text-sm font-medium mb-1"
                      >
                        Nume pe card <span className="text-[#ff6b6b]">*</span>
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium mb-1"
                      >
                        Număr card <span className="text-[#ff6b6b]">*</span>
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="cardExpiry"
                          className="block text-sm font-medium mb-1"
                        >
                          Data expirării{" "}
                          <span className="text-[#ff6b6b]">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          required
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cardCVC"
                          className="block text-sm font-medium mb-1"
                        >
                          CVC <span className="text-[#ff6b6b]">*</span>
                        </label>
                        <input
                          type="text"
                          id="cardCVC"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleChange}
                          required
                          placeholder="000"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent dark:bg-gray-800"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
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
                        Înapoi la livrare
                      </button>
                      <button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors"
                      >
                        Finalizează comanda
                      </button>
                    </div>
                  </form>
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
                      <p className="text-foreground/70 mb-2">
                        #LJH-{Math.floor(Math.random() * 10000)}-
                        {new Date().getFullYear()}
                      </p>
                      <p className="font-semibold">Total:</p>
                      <p className="text-foreground/70">
                        {total.toFixed(2)} lei
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
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.product.name} ({item.quantity})
                        </span>
                        <span>
                          {(Number(item.product.price) * item.quantity).toFixed(
                            2
                          )}{" "}
                          lei
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Subtotal</span>
                      <span>{subtotal.toFixed(2)} lei</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-foreground/70">
                        Transport{" "}
                        {shipping === 0 && (
                          <span className="text-green-600 dark:text-green-500 text-xs ml-1">
                            (Gratuit)
                          </span>
                        )}
                      </span>
                      <span>
                        {shipping > 0
                          ? `${shipping.toFixed(2)} lei`
                          : "Gratuit"}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">
                        {total.toFixed(2)} lei
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

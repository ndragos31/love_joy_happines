"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "@/lib/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();

  // Shipping cost calculation
  const shipping = subtotal > 200 ? 0 : 15; // Free shipping over 200 Lei
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Coșul tău</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-light dark:bg-gray-800 p-8 rounded-lg max-w-md mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h2 className="text-xl font-semibold mb-2">
                  Coșul tău este gol
                </h2>
                <p className="text-foreground/70 mb-6">
                  Se pare că nu ai adăugat încă niciun produs în coș.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                  Continuă cumpărăturile
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-gray-light dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold">
                      Produse ({items.length})
                    </h2>
                  </div>

                  <div>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start gap-4"
                      >
                        <div className="relative w-24 h-24 rounded-md overflow-hidden">
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
                        </div>

                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <Link
                              href={`/products/${item.id}`}
                              className="font-semibold hover:text-primary transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="mt-2 sm:mt-0 font-semibold text-primary">
                              {item.product.price} lei
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="bg-gray-200 dark:bg-gray-700 text-foreground p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
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
                                    d="M20 12H4"
                                  />
                                </svg>
                              </button>
                              <span className="mx-2 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="bg-gray-200 dark:bg-gray-700 text-foreground p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
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
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 flex justify-between items-center">
                    <Link
                      href="/products"
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
                      Continuă cumpărăturile
                    </Link>

                    <button
                      onClick={() => clearCart()}
                      className="text-red-500 hover:text-red-700 transition-colors flex items-center"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Golește coșul
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-light dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold">Rezumat comandă</h2>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Subtotal</span>
                        <span className="font-medium">
                          {subtotal.toFixed(2)} lei
                        </span>
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
                        <span className="font-medium">
                          {shipping > 0
                            ? `${shipping.toFixed(2)} lei`
                            : "Gratuit"}
                        </span>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-xl text-primary">
                            {total.toFixed(2)} lei
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      className="block w-full mt-8 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-colors text-center cursor-pointer"
                    >
                      Finalizează comanda
                    </Link>

                    <div className="mt-6 text-sm text-foreground/60">
                      <p>
                        * Preturile includ TVA. Transportul este gratuit pentru
                        comenzi peste 200 lei.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

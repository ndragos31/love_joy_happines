"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/types/product";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "@/app/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError((error as Error).message || "Failed to load products");
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Toate Produsele
            </h1>
            <p className="text-foreground/70 max-w-3xl">
              Răsfoiește colecția noastră de produse unice concepute pentru a
              aduce bucurie în viața ta
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
                Eroare
              </h2>
              <p className="text-red-500 dark:text-red-300">{error}</p>
              <Link
                href="/"
                className="mt-4 inline-block text-primary hover:underline"
              >
                Înapoi la pagina principală
              </Link>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                Nu s-au găsit produse
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Vă rugăm să verificați mai târziu
              </p>
              <Link
                href="/"
                className="mt-6 inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
              >
                Înapoi la pagina principală
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

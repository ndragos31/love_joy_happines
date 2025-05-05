"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/types/category";
import { Product } from "@/lib/types/product";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategoryAndProducts() {
      try {
        setLoading(true);

        // First fetch all categories to find the one with matching slug
        const categoriesResponse = await fetch("/api/categories");
        if (!categoriesResponse.ok) {
          throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
        }

        const categoriesData: Category[] = await categoriesResponse.json();
        const currentCategory = categoriesData.find(
          (cat) => cat.slug === categorySlug
        );

        if (!currentCategory) {
          throw new Error(`Category with slug "${categorySlug}" not found`);
        }

        setCategory(currentCategory);

        // Now fetch products for this category
        const productsResponse = await fetch(
          `/api/products?category=${currentCategory.id}`
        );
        if (!productsResponse.ok) {
          throw new Error(`HTTP error! status: ${productsResponse.status}`);
        }

        const productsData = await productsResponse.json();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category and products:", error);
        setError(
          (error as Error).message || "Failed to load category and products"
        );
        setLoading(false);
      }
    }

    if (categorySlug) {
      fetchCategoryAndProducts();
    }
  }, [categorySlug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
                Error
              </h2>
              <p className="text-red-500 dark:text-red-300">{error}</p>
              <Link
                href="/"
                className="mt-4 inline-block text-primary hover:underline"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <>
              {/* Category Header */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {category?.name}
                  </h1>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mt-2 md:mt-0">
                    {products.length} produse
                  </span>
                </div>
                {category?.description && (
                  <p className="text-foreground/70 max-w-3xl">
                    {category.description}
                  </p>
                )}
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Link
                      href={`/products/${product.id}`}
                      key={product.id}
                      className="group"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition duration-300 hover:shadow-md">
                        <div className="aspect-square relative overflow-hidden">
                          {product.images && product.images[0] ? (
                            <Image
                              src={product.images[0].src}
                              alt={product.images[0].alt || product.name}
                              fill
                              className="object-contain p-2 transition-transform group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-gray-400 dark:text-gray-500">
                                No image
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-foreground truncate">
                            {product.name}
                          </h3>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-primary font-semibold">
                              {product.price} Lei
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {product.stock_status === "instock"
                                ? "In stoc"
                                : "Stoc epuizat"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                    Nu există produse în această categorie
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Vă rugăm să verificați mai târziu sau explorați alte
                    categorii
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
                  >
                    Înapoi la pagina principală
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Product } from "@/lib/types/product";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "@/app/components/ProductCard";

interface PaginatedResponse {
  products: Product[];
  total: number;
  totalPages: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [requestedPages, setRequestedPages] = useState<Set<number>>(
    new Set([1])
  );
  const productsPerPage = 12;
  const initialLoadRef = useRef(false);

  const fetchProducts = useCallback(
    async (page: number, isInitial = false) => {
      try {
        if (isInitial) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const response = await fetch(
          `/api/products?page=${page}&per_page=${productsPerPage}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: PaginatedResponse = await response.json();

        if (isInitial) {
          setProducts(data.products);
        } else {
          setProducts((prev) => {
            // Create a Set of existing product IDs to prevent duplicates
            const existingIds = new Set(prev.map((p) => p.id));
            const newProducts = data.products.filter(
              (p) => !existingIds.has(p.id)
            );

            // Only update state if there are new products to add
            if (newProducts.length > 0) {
              return [...prev, ...newProducts];
            } else {
              return prev; // Return the same array to prevent unnecessary re-renders
            }
          });
        }

        setTotalPages(data.totalPages);
        setHasMore(page < data.totalPages);

        if (isInitial) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError((error as Error).message || "Failed to load products");
        if (isInitial) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
      }
    },
    [productsPerPage]
  );

  const loadMoreProducts = useCallback(() => {
    const nextPage = currentPage + 1;

    if (
      !loadingMore &&
      hasMore &&
      !loading &&
      !isLoadingMore &&
      !requestedPages.has(nextPage)
    ) {
      setIsLoadingMore(true);
      setRequestedPages((prev) => new Set([...prev, nextPage]));
      setCurrentPage(nextPage);
      fetchProducts(nextPage, false).finally(() => {
        setIsLoadingMore(false);
      });
    }
  }, [
    currentPage,
    hasMore,
    loadingMore,
    loading,
    isLoadingMore,
    requestedPages,
    fetchProducts,
  ]);

  // Scroll event handler with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Trigger load more when user is 500px from bottom
        if (
          window.innerHeight + document.documentElement.scrollTop + 500 >=
          document.documentElement.scrollHeight
        ) {
          loadMoreProducts();
        }
      }, 100); // 100ms debounce
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [loadMoreProducts]);

  // Initial load
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      fetchProducts(1, true);
    }
  }, []); // Empty dependency array since we only want this to run once

  const retryFetch = () => {
    setError("");
    fetchProducts(1, true);
  };

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
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-foreground/70">Se încarcă produsele...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
                Eroare la încărcarea produselor
              </h2>
              <p className="text-red-500 dark:text-red-300 mb-4">{error}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={retryFetch}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Încearcă din nou
                </button>
                <Link
                  href="/"
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Înapoi la pagina principală
                </Link>
              </div>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={`${product.id}-${index}`}
                    product={product}
                  />
                ))}
              </div>

              {/* Loading more indicator */}
              {loadingMore && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-2 text-foreground/70">
                    Se încarcă mai multe produse...
                  </span>
                </div>
              )}

              {/* Load more button (fallback for users who prefer clicking) */}
              {!loadingMore && hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={loadMoreProducts}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Încarcă mai multe produse
                  </button>
                </div>
              )}

              {/* End of products message */}
              {!hasMore && products.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-foreground/70">
                    Ai văzut toate produsele disponibile ({products.length}{" "}
                    produse)
                  </p>
                </div>
              )}
            </>
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

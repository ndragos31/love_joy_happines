"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Product } from "@/lib/types/product";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "@/app/[locale]/components/ProductCard";

interface PaginatedResponse {
  products: Product[];
  total: number;
  totalPages: number;
}

export default function ProductsPage() {
  const t = useTranslations("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
            const existingIds = new Set(prev.map((p) => p.id));
            const newProducts = data.products.filter(
              (p) => !existingIds.has(p.id)
            );

            if (newProducts.length > 0) {
              return [...prev, ...newProducts];
            } else {
              return prev;
            }
          });
        }

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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop + 500 >=
          document.documentElement.scrollHeight
        ) {
          loadMoreProducts();
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [loadMoreProducts]);

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      fetchProducts(1, true);
    }
  }, [fetchProducts]);

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
              {t("listingHeading")}
            </h1>
            <p className="text-foreground/70 max-w-3xl">
              {t("listingSubheading")}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-foreground/70">{t("loading")}</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
                {t("error.heading")}
              </h2>
              <p className="text-red-500 dark:text-red-300 mb-4">{error}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={retryFetch}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
                >
                  {t("error.retry")}
                </button>
                <Link
                  href="/"
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  {t("backToHome")}
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

              {loadingMore && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-2 text-foreground/70">
                    {t("loadingMore")}
                  </span>
                </div>
              )}

              {!loadingMore && hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={loadMoreProducts}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    {t("loadMoreButton")}
                  </button>
                </div>
              )}

              {!hasMore && products.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-foreground/70">
                    {t("allProductsSeen", { count: products.length })}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                {t("noProducts")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {t("noProductsSubtext")}
              </p>
              <Link
                href="/"
                className="mt-6 inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
              >
                {t("backToHome")}
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Product } from "@/lib/types/product";
import { Category } from "@/lib/types/category";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "@/app/[locale]/components/ProductCard";
import CategoryChips from "@/app/[locale]/components/CategoryChips";
import ProductGridSkeleton from "@/app/[locale]/components/ProductGridSkeleton";

interface PaginatedResponse {
  products: Product[];
  total: number;
  totalPages: number;
}

export default function ProductsPage() {
  const t = useTranslations("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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

  useEffect(() => {
    fetch("/api/categories?per_page=100")
      .then((response) => (response.ok ? response.json() : []))
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const retryFetch = () => {
    setError("");
    fetchProducts(1, true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <header className="container-custom pt-14 pb-8 md:pt-20 md:pb-10">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance md:text-7xl">
            {t("listingHeading")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-pretty text-muted">
            {t("listingSubheading")}
          </p>
        </header>

        <div className="container-custom pb-20 md:pb-28">
          <div className="mb-10 md:mb-12">
            <CategoryChips categories={categories} showAllProducts />
          </div>

          {loading ? (
            <ProductGridSkeleton label={t("loading")} />
          ) : error ? (
            <div className="rounded-4xl bg-error/10 px-6 py-14 text-center">
              <h2 className="font-display text-3xl font-medium">{t("error.heading")}</h2>
              <p className="mt-3 text-error">{error}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={retryFetch}
                  className="inline-flex h-12 cursor-pointer items-center rounded-full bg-foreground px-7 font-medium text-background transition duration-200 hover:bg-primary active:scale-98"
                >
                  {t("error.retry")}
                </button>
                <Link
                  href="/"
                  className="inline-flex h-12 items-center rounded-full border border-foreground/20 px-7 font-medium transition-colors hover:border-foreground"
                >
                  {t("backToHome")}
                </Link>
              </div>
            </div>
          ) : products.length > 0 ? (
            <>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3 lg:gap-y-14 xl:grid-cols-4">
                {products.map((product, index) => (
                  <li key={`${product.id}-${index}`}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>

              {loadingMore && (
                <div className="mt-14">
                  <ProductGridSkeleton label={t("loadingMore")} count={4} />
                </div>
              )}

              {!loadingMore && hasMore && (
                <div className="mt-14 flex justify-center">
                  <button
                    type="button"
                    onClick={loadMoreProducts}
                    className="inline-flex h-14 cursor-pointer items-center rounded-full border border-foreground/20 px-8 font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    {t("loadMoreButton")}
                  </button>
                </div>
              )}

              {!hasMore && (
                <p className="mt-16 flex items-center justify-center gap-3 text-sm text-muted">
                  <span className="h-2 w-3 -rotate-12 rounded-full bg-primary" />
                  {t("allProductsSeen", { count: products.length })}
                </p>
              )}
            </>
          ) : (
            <div className="rounded-4xl bg-sand px-6 py-20 text-center">
              <h2 className="font-display text-3xl font-medium">{t("noProducts")}</h2>
              <p className="mt-3 text-muted">{t("noProductsSubtext")}</p>
              <Link
                href="/"
                className="mt-8 inline-flex h-12 items-center rounded-full bg-foreground px-7 font-medium text-background transition-colors hover:bg-primary"
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

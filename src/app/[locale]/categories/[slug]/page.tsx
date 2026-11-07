"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Category } from "@/lib/types/category";
import { Product } from "@/lib/types/product";
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import ProductCard from "@/app/[locale]/components/ProductCard";
import CategoryChips from "@/app/[locale]/components/CategoryChips";
import ProductGridSkeleton from "@/app/[locale]/components/ProductGridSkeleton";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  const t = useTranslations("categories");
  const productsText = useTranslations("products");

  const [category, setCategory] = useState<Category | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategoryAndProducts() {
      try {
        setLoading(true);

        const categoriesResponse = await fetch("/api/categories?per_page=100");
        if (!categoriesResponse.ok) {
          throw new Error(`HTTP error! status: ${categoriesResponse.status}`);
        }

        const categoriesData: Category[] = await categoriesResponse.json();
        setAllCategories(categoriesData);
        const currentCategory = categoriesData.find(
          (cat) => cat.slug === categorySlug
        );

        if (!currentCategory) {
          throw new Error(`Category with slug "${categorySlug}" not found`);
        }

        setCategory(currentCategory);

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

  const hasImage = Boolean(category?.image?.src);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow pt-6 pb-20 md:pt-8 md:pb-28">
        <div className="container-custom">
          {loading ? (
            <>
              <div className="h-80 animate-pulse rounded-4xl bg-sand md:h-96" />
              <div className="mt-12">
                <ProductGridSkeleton label={productsText("loading")} />
              </div>
            </>
          ) : error ? (
            <div className="rounded-4xl bg-error/10 px-6 py-14 text-center">
              <h1 className="font-display text-3xl font-medium">{t("errorHeading")}</h1>
              <p className="mt-3 text-error">{error}</p>
              <Link
                href="/"
                className="mt-8 inline-flex h-12 items-center rounded-full bg-foreground px-7 font-medium text-background transition-colors hover:bg-primary"
              >
                {t("returnToHome")}
              </Link>
            </div>
          ) : (
            <>
              <header className="relative overflow-hidden rounded-4xl bg-sand">
                {hasImage && category && (
                  <>
                    <Image
                      src={category.image.src}
                      alt={category.image.alt || category.name}
                      fill
                      priority
                      sizes="(max-width: 1280px) 100vw, 1216px"
                      className="object-cover"
                    />
                    <span className="absolute inset-0 bg-linear-to-t from-foreground/85 via-foreground/35 to-foreground/5" />
                  </>
                )}
                <div
                  className={`relative flex min-h-80 flex-col justify-end p-7 sm:p-10 md:min-h-96 md:p-14 ${
                    hasImage ? "text-white" : ""
                  }`}
                >
                  <span
                    className={`mb-5 inline-flex w-fit items-center rounded-full px-3.5 py-1.5 text-sm font-medium ${
                      hasImage ? "bg-white/15 backdrop-blur" : "bg-background"
                    }`}
                  >
                    {t("productCount", { count: products.length })}
                  </span>
                  <h1 className="max-w-4xl font-display text-5xl leading-none font-medium tracking-tight text-balance md:text-7xl">
                    {category?.name}
                  </h1>
                  {category?.description && (
                    <p
                      className={`mt-5 max-w-2xl text-lg text-pretty ${
                        hasImage ? "text-white/80" : "text-muted"
                      }`}
                    >
                      {category.description}
                    </p>
                  )}
                </div>
              </header>

              <div className="mt-8 mb-12">
                <CategoryChips
                  categories={allCategories}
                  activeSlug={categorySlug}
                  showAllProducts
                />
              </div>

              {products.length > 0 ? (
                <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3 lg:gap-y-14 xl:grid-cols-4">
                  {products.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-4xl bg-sand px-6 py-20 text-center">
                  <h2 className="font-display text-3xl font-medium">{t("emptyHeading")}</h2>
                  <p className="mt-3 text-muted">{t("emptyMessage")}</p>
                  <Link
                    href="/"
                    className="mt-8 inline-flex h-12 items-center rounded-full bg-foreground px-7 font-medium text-background transition-colors hover:bg-primary"
                  >
                    {t("emptyCta")}
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

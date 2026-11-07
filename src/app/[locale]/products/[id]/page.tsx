"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Product } from "@/lib/types/product";
import { useCart } from "@/lib/context/CartContext";
import { getFreeQuantity, hasFreeItemOffer, PAID_ITEMS_PER_FREE_ITEM } from "@/lib/utils/price";
import ProductImageGallery from "@/app/[locale]/components/ProductImageGallery";

const descriptionClassName =
  "leading-relaxed text-muted [&_a]:text-primary [&_a]:underline [&_li]:mt-1 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-3 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5";

export default function ProductPage() {
  const t = useTranslations("products");
  const tOffer = useTranslations("freeItemOffer");
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [attributeError, setAttributeError] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch(`/api/products?id=${productId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);

        if (data.default_attributes && data.default_attributes.length > 0) {
          const defaults: Record<string, string> = {};
          data.default_attributes.forEach((attr: { name: string; option: string }) => {
            defaults[attr.name] = attr.option;
          });
          setSelectedAttributes(defaults);
        } else if (data.attributes && data.attributes.length > 0) {
          const defaults: Record<string, string> = {};
          data.attributes.forEach((attr: { name: string; options: string[] }) => {
            if (attr.options && attr.options.length > 0) {
              defaults[attr.name] = attr.options[0];
            }
          });
          setSelectedAttributes(defaults);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError((error as Error).message || "Failed to load product");
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    if (product.attributes && product.attributes.length > 0) {
      const missingAttributes = product.attributes.filter(
        (attr) => !selectedAttributes[attr.name] || selectedAttributes[attr.name] === ""
      );
      if (missingAttributes.length > 0) {
        setAttributeError(t("detail.selectRequired", { attributes: missingAttributes.map(attr => attr.name).join(", ") }));
        return;
      }
    }

    setAttributeError("");
    setAddingToCart(true);

    addItem(product, quantity, Object.keys(selectedAttributes).length > 0 ? selectedAttributes : undefined);

    setTimeout(() => {
      setAddingToCart(false);
      setAddedToCart(true);

      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }, 1000);
  };

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const selectAttribute = (name: string, value: string) => {
    setAttributeError("");
    setSelectedAttributes((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="grow pt-6 pb-20 md:pt-8">
          <div
            role="status"
            aria-label={t("detail.loading")}
            className="container-custom grid animate-pulse gap-10 lg:grid-cols-12 lg:gap-14"
          >
            <div className="aspect-square rounded-4xl bg-sand lg:col-span-7" />
            <div className="space-y-4 pt-8 lg:col-span-5">
              <div className="h-5 w-1/3 rounded-full bg-sand" />
              <div className="h-12 w-4/5 rounded-2xl bg-sand" />
              <div className="h-9 w-1/4 rounded-2xl bg-sand" />
              <div className="h-24 rounded-3xl bg-sand" />
              <div className="h-14 rounded-full bg-sand" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="grow py-16 md:py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-xl rounded-4xl bg-sand px-6 py-16 text-center">
              <h1 className="font-display text-4xl font-medium">{t("detail.notFound")}</h1>
              <p className="mt-4 text-muted">{t("detail.notFoundMessage")}</p>
              <Link
                href="/products"
                className="mt-8 inline-flex h-12 items-center rounded-full bg-foreground px-7 font-medium text-background transition-colors hover:bg-primary"
              >
                {t("detail.backToProducts")}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isInStock = product.stock_status === "instock";
  const freeQuantity = getFreeQuantity(product, quantity);
  const shippingItems = [
    t("detail.shippingItem1"),
    t("detail.shippingItem2"),
    t("detail.shippingItem3"),
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow pt-6 pb-20 md:pt-8 md:pb-28">
        <div className="container-custom">
          <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted md:mb-8">
            <Link href="/" className="transition-colors hover:text-foreground">
              {t("detail.breadcrumbHome")}
            </Link>
            <span aria-hidden>/</span>
            <Link href="/products" className="transition-colors hover:text-foreground">
              {t("detail.breadcrumbProducts")}
            </Link>
            {product.categories && product.categories.length > 0 && (
              <>
                <span aria-hidden>/</span>
                <Link
                  href={`/categories/${product.categories[0].slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {product.categories[0].name}
                </Link>
              </>
            )}
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-28">
                <ProductImageGallery images={product.images} productName={product.name} />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-4">
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="rounded-full bg-sand px-3 py-1 text-xs font-medium transition-colors hover:bg-line"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="mt-5 font-display text-4xl leading-tight font-medium tracking-tight text-balance md:text-5xl lg:text-4xl xl:text-5xl">
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                {product.on_sale && product.sale_price ? (
                  <p className="flex items-baseline gap-3 font-display tabular-nums">
                    <span className="text-3xl font-medium text-primary">{product.sale_price} Lei</span>
                    <span className="text-lg text-muted line-through">{product.regular_price} Lei</span>
                  </p>
                ) : (
                  <p className="font-display text-3xl font-medium tabular-nums">{product.price} Lei</p>
                )}
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                    isInStock ? "bg-success/10 text-success" : "bg-error/10 text-error"
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${isInStock ? "bg-success" : "bg-error"}`} />
                  {isInStock ? t("detail.inStock") : t("detail.outOfStock")}
                </span>
                {hasFreeItemOffer(product) && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                    <GiftIcon className="size-3.5" />
                    {tOffer("badge", { paid: PAID_ITEMS_PER_FREE_ITEM })}
                  </span>
                )}
              </div>

              {product.short_description && (
                <div
                  className={`mt-6 text-pretty ${descriptionClassName}`}
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              )}

              {product.attributes && product.attributes.length > 0 && (
                <div className="mt-8 space-y-6 border-t border-line pt-8">
                  {product.attributes.map((attribute) => {
                    const parsedOptions = attribute.options?.flatMap((option) => {
                      const splitOptions = option
                        .split(/\s*\|\s*/)
                        .map((opt) => opt.trim())
                        .filter((opt) => opt.length > 0);
                      return splitOptions.length > 0 ? splitOptions : [option];
                    }) || [];

                    const uniqueOptions = Array.from(new Set(parsedOptions));
                    const selectedValue = selectedAttributes[attribute.name] || "";

                    return (
                      <fieldset key={`product-attr-${product.id}-attr-${attribute.id}-${attribute.name}`}>
                        <legend className="mb-3 text-sm font-medium">
                          {attribute.name} <span className="text-primary">*</span>
                        </legend>
                        {uniqueOptions.length <= 8 ? (
                          <div className="flex flex-wrap gap-2">
                            {uniqueOptions.map((option, index) => (
                              <label
                                key={`product-${product.id}-attr-${attribute.id}-opt-${index}-${option}`}
                                className="cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`attribute-${attribute.id}-${attribute.name}`}
                                  value={option}
                                  checked={selectedValue === option}
                                  onChange={() => selectAttribute(attribute.name, option)}
                                  className="peer sr-only"
                                />
                                <span className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-4 peer-focus-visible:ring-primary-soft hover:border-foreground/40">
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <div className="relative">
                            <select
                              value={selectedValue}
                              onChange={(event) => selectAttribute(attribute.name, event.target.value)}
                              className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-line bg-surface pr-11 pl-4 text-sm transition outline-none hover:border-foreground/40 focus:border-primary focus:ring-4 focus:ring-primary-soft"
                              required
                            >
                              <option value="" disabled>
                                {t("detail.selectAttribute", { name: attribute.name.toLowerCase() })}
                              </option>
                              {uniqueOptions.map((option, index) => (
                                <option key={`product-${product.id}-attr-${attribute.id}-opt-${index}-${option}`} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <svg
                              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                              aria-hidden
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </div>
                        )}
                      </fieldset>
                    );
                  })}
                </div>
              )}

              {attributeError && (
                <p role="alert" className="mt-5 rounded-2xl bg-error/10 px-4 py-3 text-sm text-error">
                  {attributeError}
                </p>
              )}

              {isInStock && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-14 items-center justify-between rounded-full border border-line bg-surface px-1.5 sm:w-40">
                    <button
                      type="button"
                      onClick={decrementQuantity}
                      aria-label={t("detail.decreaseQuantity")}
                      className="grid size-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-sand"
                    >
                      <StrokeIcon path="M5 12h14" />
                    </button>
                    <label htmlFor="quantity" className="sr-only">
                      {t("detail.quantity")}
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={(event) => setQuantity(parseInt(event.target.value) || 1)}
                      className="w-10 [appearance:textfield] bg-transparent text-center font-medium tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={incrementQuantity}
                      aria-label={t("detail.increaseQuantity")}
                      className="grid size-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-sand"
                    >
                      <StrokeIcon path="M12 5v14M5 12h14" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className={`inline-flex h-14 grow cursor-pointer items-center justify-center gap-2 rounded-full px-8 font-medium text-white transition duration-200 active:scale-98 disabled:cursor-wait ${
                      addedToCart ? "bg-success" : "bg-primary hover:bg-primary-hover"
                    } ${addingToCart ? "opacity-70" : ""}`}
                  >
                    {addingToCart ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        {t("detail.adding")}
                      </>
                    ) : addedToCart ? (
                      <>
                        <StrokeIcon path="m5 12.5 4.5 4.5L19 7.5" />
                        {t("detail.added")}
                      </>
                    ) : (
                      t("detail.addToCart")
                    )}
                  </button>
                </div>
              )}

              {isInStock && hasFreeItemOffer(product) && (
                <div className="mt-3 flex items-center gap-4 rounded-3xl bg-primary-soft px-5 py-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-background text-primary">
                    <GiftIcon className="size-5" />
                  </span>
                  <div aria-live="polite">
                    <p className="font-medium">{tOffer("title", { paid: PAID_ITEMS_PER_FREE_ITEM })}</p>
                    <p className="text-sm text-muted">
                      {freeQuantity > 0
                        ? tOffer("earned", { free: freeQuantity, total: quantity + freeQuantity })
                        : tOffer("missing", { count: PAID_ITEMS_PER_FREE_ITEM - quantity })}
                    </p>
                  </div>
                </div>
              )}

              <ul className="mt-8 grid gap-3 rounded-3xl bg-sand p-5 text-sm sm:p-6">
                {shippingItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-background text-primary">
                      <svg
                        className="size-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {product.description && (
                <details open className="group mt-8 border-t border-line pt-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-2xl font-medium [&::-webkit-details-marker]:hidden">
                    {t("detail.description")}
                    <svg
                      className="size-5 text-muted transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div
                    className={`mt-5 ${descriptionClassName}`}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </details>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const StrokeIcon = ({ path }: { path: string }) => (
  <svg
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d={path} />
  </svg>
);

const GiftIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d="M4 8h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1ZM12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

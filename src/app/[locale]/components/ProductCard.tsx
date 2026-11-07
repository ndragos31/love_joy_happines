"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/context/CartContext";
import { Product } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("products");
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface">
        <Link href={`/products/${product.id}`} className="absolute inset-0">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <span className="grid h-full place-items-center text-sm text-muted">
              {t("gallery.noImage")}
            </span>
          )}
        </Link>

        {product.categories && product.categories.length > 0 && (
          <span className="pointer-events-none absolute inset-x-3 top-3 hidden sm:flex">
            <span className="truncate rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
              {product.categories[0].name}
            </span>
          </span>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdded}
          aria-label={t("card.addToCartAriaLabel")}
          className={`absolute right-2.5 bottom-2.5 grid size-10 cursor-pointer sm:right-3 sm:bottom-3 sm:size-11 place-items-center rounded-full shadow-soft transition duration-300 active:scale-95 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100 ${
            isAdded
              ? "bg-success text-white lg:translate-y-0 lg:opacity-100"
              : "bg-foreground text-background hover:bg-primary"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d={isAdded ? "m5 12.5 4.5 4.5L19 7.5" : "M12 5v14M5 12h14"} />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-1 px-1 sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <h3 className="line-clamp-2 text-sm leading-snug font-medium sm:text-base">
          <Link href={`/products/${product.id}`} className="transition-colors hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="flex shrink-0 items-baseline gap-2 font-display text-lg leading-snug tabular-nums sm:flex-col sm:items-end sm:gap-0">
          {product.on_sale && product.regular_price && (
            <span className="order-last text-sm text-muted line-through sm:order-first">
              {product.regular_price} Lei
            </span>
          )}
          {product.price} Lei
        </p>
      </div>
    </article>
  );
}

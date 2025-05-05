"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";
import { Product } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    // Add product to cart
    addItem(product, 1);

    // Reset adding state after animation
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 w-full overflow-hidden cursor-pointer">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-contain p-2 transition-transform duration-500 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
              No image
            </div>
          )}
          {product.categories && product.categories.length > 0 && (
            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              {product.categories[0].name}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-1 truncate cursor-pointer hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p
          className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-primary">
            {product.price} Lei
          </span>

          <div className="flex space-x-2">
            <div className="relative group">
              <button
                className={`${
                  isAdding ? "bg-green-500" : "bg-secondary hover:opacity-90"
                } text-white p-2 rounded-full transition-all cursor-pointer`}
                aria-label="Adaugă în Coș"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? (
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                )}
              </button>
              <div className="absolute bottom-full mb-2 -left-5 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                Adaugă în coș
              </div>
            </div>

            <div className="relative group">
              <Link href={`/products/${product.id}`}>
                <button
                  className="bg-gray-light dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-medium dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  aria-label="Vezi Produsul"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </Link>
              <div className="absolute -top-8 -left-10 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                Vizualizează
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

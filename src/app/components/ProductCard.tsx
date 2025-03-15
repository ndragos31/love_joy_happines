"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  description,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
          {category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
          {description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-primary">
            ${price.toFixed(2)}
          </span>

          <div className="flex space-x-2">
            <button
              className="bg-secondary text-white p-2 rounded-full hover:opacity-90 transition-opacity"
              aria-label="Add to cart"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            <Link href={`/products/${id}`}>
              <button
                className="bg-gray-light dark:bg-gray-700 text-foreground p-2 rounded-full hover:bg-gray-medium dark:hover:bg-gray-600 transition-colors"
                aria-label="View details"
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
          </div>
        </div>
      </div>
    </div>
  );
}

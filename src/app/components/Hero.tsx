"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/types/category";

export default function Hero() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch product categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Category[] = await response.json();
        setCategories(
          data.filter((category) => category.image && category.image.src)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Carousel rotation
  useEffect(() => {
    if (categories.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === categories.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [categories]);

  // Fallback image if no categories with images
  const fallbackImage = "/images/hero-image.jpg";

  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[#ff6b6b]/5 blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-[#4ecdc4]/5 blur-3xl"></div>
      <div className="absolute top-40 left-1/4 w-24 h-24 rounded-full bg-[#ffdd67]/5 blur-xl"></div>

      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <div className="w-full max-w-[600px]">
              <Image
                src="/logo dreptunghi.jpg"
                alt="Love Joy Happiness Logo"
                width={600}
                height={200}
                priority
                className="w-full h-auto"
              />
            </div>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-4 ml-8">
              Etichete, genți pentru uleiuri esențiale, flyere, stickere auto și
              produse personalizate care răspândesc dragoste și fericire
            </p>

            <div className="flex flex-row pt-6">
              <Link href="/categories">
                <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-medium rounded-md px-8 py-3 text-lg transition-colors cursor-pointer ml-8">
                  Explorează Colecția
                </button>
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 z-10 pointer-events-none"></div>

            {/* Carousel navigation buttons */}
            {categories.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? categories.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2"
                  aria-label="Previous image"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === categories.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2"
                  aria-label="Next image"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Carousel indicators */}
            {categories.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {categories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Images */}
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4ecdc4]"></div>
              </div>
            ) : categories.length > 0 ? (
              categories.map((category, index) => (
                <div
                  key={category.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={category.image.src}
                    alt={category.image.alt || category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover bg-white dark:bg-gray-900"
                    priority={index === 0}
                  />
                </div>
              ))
            ) : (
              <Image
                src={fallbackImage}
                alt="Autocolante și bannere colorate"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/types/category";

// Define icon components to use as fallbacks
const CategoryIcons = {
  autocolante: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  ),
  etichete: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-secondary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  ),
  default: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-accent dark:text-yellow-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  ),
};

// Define gradient colors for categories
const categoryColors = [
  "from-primary/20 to-primary/40",
  "from-secondary/20 to-secondary/40",
  "from-accent/20 to-accent/40",
  "from-pink-500/20 to-pink-500/40",
  "from-blue-500/20 to-blue-500/40",
  "from-green-500/20 to-green-500/40",
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Category[] = await response.json();
        setCategories(data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Function to get icon based on category slug
  const getCategoryIcon = (slug: string) => {
    if (slug.includes("autocolante")) return CategoryIcons.autocolante;
    if (slug.includes("etichete")) return CategoryIcons.etichete;
    return CategoryIcons.default;
  };

  // Function to get a color based on index
  const getCategoryColor = (index: number) => {
    return categoryColors[index % categoryColors.length];
  };

  return (
    <section className="py-16 bg-gray-light dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cumpără după Categorie
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Răsfoiește colecția noastră de produse concepute pentru a aduce
            bucurie în viața ta
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                href={`/categories/${category.slug}`}
                key={category.id}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
                  {category.image && category.image.src ? (
                    <div className="h-48 relative">
                      <Image
                        src={category.image.src}
                        alt={category.image.alt || category.name}
                        fill
                        className="object-cover bg-white dark:bg-gray-900"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                    </div>
                  ) : (
                    <div
                      className={`h-48 relative bg-gradient-to-br ${getCategoryColor(
                        index
                      )}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        {getCategoryIcon(category.slug)}
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      {category.count > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {category.count} produse
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/70 mb-4 flex-grow">
                      {category.description ||
                        `Descoperă colecția noastră de ${category.name.toLowerCase()}`}
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      <span>Vezi Toate</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

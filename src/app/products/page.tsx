"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Product } from "@/lib/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as Product[];
        setProducts(data);

        // Extract unique categories safely
        const uniqueCategories = new Set<string>();
        uniqueCategories.add("All");

        data.forEach((product) => {
          if (product.category && typeof product.category === "string") {
            uniqueCategories.add(product.category);
          }
        });

        setCategories(Array.from(uniqueCategories));
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory && selectedCategory !== "All"
      ? products.filter((product) => product.category === selectedCategory)
      : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    // Default to featured
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Produse</h1>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-foreground/70 text-lg">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:justify-between mb-8">
                <div className="mb-4 md:mb-0">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-foreground/70 mb-1"
                  >
                    Categorie
                  </label>
                  <select
                    id="category"
                    className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value === "All" ? null : e.target.value
                      )
                    }
                    value={selectedCategory || "All"}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sort"
                    className="block text-sm font-medium text-foreground/70 mb-1"
                  >
                    Sortează după
                  </label>
                  <select
                    id="sort"
                    className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    onChange={(e) => setSortOption(e.target.value)}
                    value={sortOption}
                  >
                    <option value="featured">Recomandate</option>
                    <option value="price-asc">Preț: mic la mare</option>
                    <option value="price-desc">Preț: mare la mic</option>
                    <option value="name">Nume</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    description={product.description}
                  />
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-foreground/70 text-lg">
                    Nu există produse în această categorie.
                  </p>
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

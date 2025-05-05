"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types/product";

export default function FeaturedProducts() {
  // Temporary placeholder products instead of fetching
  const featuredProducts: Product[] = [
    {
      id: "placeholder1",
      name: "Sample Product 1",
      price: 19.99,
      image: "/images/placeholder.jpg",
      category: "Sample",
      description: "This is a placeholder product description.",
      featured: true,
    },
    {
      id: "placeholder2",
      name: "Sample Product 2",
      price: 29.99,
      image: "/images/placeholder.jpg",
      category: "Sample",
      description: "Another placeholder product for display purposes.",
      featured: true,
    },
    {
      id: "placeholder3",
      name: "Sample Product 3",
      price: 39.99,
      image: "/images/placeholder.jpg",
      category: "Sample",
      description: "A third placeholder product to fill the grid.",
      featured: true,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Produse Recomandate
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Verifică cele mai populare articole ale noastre
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
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

        <div className="text-center mt-12">
          <Link href="/products" className="btn btn-primary px-8 py-3">
            Vezi Toate
          </Link>
        </div>
      </div>
    </section>
  );
}

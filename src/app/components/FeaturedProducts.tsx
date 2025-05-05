"use client";

import { featuredProducts } from "../data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
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
          <a href="/products" className="btn btn-primary px-8 py-3">
            Vezi Toate
          </a>
        </div>
      </div>
    </section>
  );
}

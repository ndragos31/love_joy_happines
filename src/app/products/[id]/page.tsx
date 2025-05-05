"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getProductById, products } from "../../data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Produs Negăsit</h1>
            <p className="mb-8">
              Ne pare rău, produsul pe care îl cauți nu există.
            </p>
            <Link href="/products" className="btn btn-primary">
              Înapoi la Produse
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    // Add to cart functionality would go here
    console.log("Adding to cart:", {
      product,
      quantity,
      selectedSize,
      selectedColor,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="mb-8 text-sm text-foreground/70">
            <Link href="/" className="hover:text-primary">
              Acasă
            </Link>{" "}
            /{" "}
            <Link href="/products" className="hover:text-primary">
              Produse
            </Link>{" "}
            /{" "}
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-primary"
            >
              {product.category}
            </Link>{" "}
            / <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.new && (
                <div className="absolute top-4 left-4 bg-accent text-white text-sm px-3 py-1 rounded-full">
                  Nou
                </div>
              )}
              {product.bestSeller && (
                <div className="absolute top-4 left-4 bg-secondary text-white text-sm px-3 py-1 rounded-full">
                  Best Seller
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="mr-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {product.category}
                </div>
                <div className="text-yellow-500 flex">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-foreground/50 ml-1">(12 recenzii)</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-primary mb-4">
                ${product.price.toFixed(2)}
              </div>

              <p className="text-foreground/80 mb-6">{product.description}</p>

              {product.details && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Detalii</h3>
                  <p className="text-foreground/80">{product.details}</p>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Mărime</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-2 border rounded-md ${
                          selectedSize === size
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-300 dark:border-gray-700 hover:border-primary"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Culoare</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-4 py-2 border rounded-md ${
                          selectedColor === color
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-300 dark:border-gray-700 hover:border-primary"
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="font-semibold mb-2">Cantitate</h3>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 border border-gray-300 dark:border-gray-700 rounded-l-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 h-10 border-t border-b border-gray-300 dark:border-gray-700 text-center bg-white dark:bg-gray-900"
                  />
                  <button
                    className="w-10 h-10 border border-gray-300 dark:border-gray-700 rounded-r-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex items-center gap-2 py-3 px-8"
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
                  Adaugă în Coș
                </button>
                <button className="btn btn-outline">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Produse Similare</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-primary font-bold mb-4">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                      <Link
                        href={`/products/${relatedProduct.id}`}
                        className="block text-center py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
                      >
                        Vezi Produsul
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Product } from "@/lib/types/product";
import { useCart } from "@/lib/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

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

    setAddingToCart(true);

    // Use the cart context to add the item
    addItem(product, quantity);

    setTimeout(() => {
      setAddingToCart(false);
      setAddedToCart(true);

      // Reset the "added" message after 3 seconds
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

  const renderPrice = () => {
    if (!product) return null;

    if (product.on_sale && product.sale_price) {
      return (
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary mr-3">
            {product.sale_price} Lei
          </span>
          <span className="text-lg text-gray-500 line-through">
            {product.regular_price} Lei
          </span>
        </div>
      );
    }

    return (
      <span className="text-2xl font-bold text-primary">
        {product.price} Lei
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold">Se încarcă produsul...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Produs Negăsit</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              Ne pare rău, produsul pe care îl cauți nu există.
            </p>
            <Link
              href="/products"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md inline-block"
            >
              Înapoi la Produse
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-gray-50 dark:bg-gray-900">
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
            {product.categories && product.categories.length > 0 && (
              <>
                /{" "}
                <Link
                  href={`/categories/${product.categories[0].slug}`}
                  className="hover:text-primary"
                >
                  {product.categories[0].name}
                </Link>{" "}
              </>
            )}
            / <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product section - improved layout */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0">
              {/* Product images - 5 columns on large screens */}
              <div className="lg:col-span-5 p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  {/* Main product image */}
                  <div className="aspect-square relative bg-white rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[currentImageIndex].src}
                        alt={
                          product.images[currentImageIndex].alt || product.name
                        }
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <span className="text-gray-400">Fără imagine</span>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail gallery */}
                  {product.images && product.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {product.images.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative h-16 w-16 flex-shrink-0 rounded-md border-2 transition-all ${
                            currentImageIndex === index
                              ? "border-primary"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt || `Product image ${index + 1}`}
                            fill
                            className="object-contain p-1"
                            sizes="80px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product info - 4 columns on large screens */}
              <div className="lg:col-span-4 p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>

                {/* Categories */}
                {product.categories && product.categories.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {product.categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="text-xs inline-block bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-2.5 py-1 rounded-full transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Price */}
                <div className="mb-6">{renderPrice()}</div>

                {/* Stock status */}
                <div className="mb-6">
                  {product.stock_status === "instock" ? (
                    <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-500 rounded-full">
                      În stoc
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-500 rounded-full">
                      Stoc epuizat
                    </span>
                  )}
                </div>

                {/* Short description */}
                <div className="mb-6">
                  <div
                    className="text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: product.short_description,
                    }}
                  />
                </div>

                {/* Quantity and Add to cart */}
                {product.stock_status === "instock" && (
                  <div className="mt-auto">
                    <div className="flex items-center mb-4">
                      <label
                        htmlFor="quantity"
                        className="mr-4 font-medium text-gray-700 dark:text-gray-300"
                      >
                        Cantitate:
                      </label>
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                        <button
                          type="button"
                          onClick={decrementQuantity}
                          className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          min="1"
                          max="10"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value) || 1)
                          }
                          className="w-12 border-0 text-center focus:ring-0 p-0 bg-transparent text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={incrementQuantity}
                          className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                      className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
                        addingToCart
                          ? "bg-gray-400"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {addingToCart ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Adăugare...
                        </span>
                      ) : addedToCart ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Adăugat în coș
                        </span>
                      ) : (
                        "Adaugă în coș"
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Product description - 3 columns on large screens */}
              <div className="lg:col-span-3 p-6">
                <div className="mb-4">
                  <div className="text-lg font-medium text-primary pb-2 border-b border-gray-200 dark:border-gray-700">
                    Descriere
                  </div>
                </div>
                <div
                  className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          </div>

          {/* Additional product details */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "description"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  Detalii
                </button>
                <button
                  onClick={() => setActiveTab("specifications")}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "specifications"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  Specificații
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "shipping"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  Livrare
                </button>
              </div>
            </div>
            <div className="p-6">
              {activeTab === "description" && (
                <div className="prose prose-lg prose-primary max-w-none dark:prose-invert">
                  <p>
                    Acest produs se pretează pentru mai multe utilizări și este
                    ideal pentru a fi folosit în diverse situații.
                  </p>
                </div>
              )}
              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Specificații produs
                  </h3>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="py-2 text-sm font-medium text-gray-500 dark:text-gray-400 w-1/3">
                          SKU
                        </td>
                        <td className="py-2 text-sm text-gray-900 dark:text-gray-100">
                          {product.id || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          Greutate
                        </td>
                        <td className="py-2 text-sm text-gray-900 dark:text-gray-100">
                          {product.weight ? `${product.weight} kg` : "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          Dimensiuni
                        </td>
                        <td className="py-2 text-sm text-gray-900 dark:text-gray-100">
                          {product.dimensions
                            ? `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height} cm`
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "shipping" && (
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Informații de livrare
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Livrare în 24-48 de ore lucrătoare
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Transport gratuit pentru comenzi peste 200 Lei
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Plata ramburs sau online
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

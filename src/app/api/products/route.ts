import { NextResponse } from "next/server";
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsWithPagination,
} from "@/lib/services/woocommerce/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const featured = searchParams.get("featured");
    const categoryId = searchParams.get("category");
    const page = searchParams.get("page");
    const perPage = searchParams.get("per_page");

    // If ID is provided, fetch a specific product
    if (id && !isNaN(Number(id))) {
      const product = await getProductById(Number(id));
      return NextResponse.json(product);
    }

    // If featured flag is set, fetch featured products
    if (featured === "true") {
      const featuredProducts = await getFeaturedProducts();
      return NextResponse.json(featuredProducts);
    }

    // If category ID is provided, fetch products by category
    if (categoryId && !isNaN(Number(categoryId))) {
      // Build query parameters for category products
      const categoryParams: Record<string, string | number> = {};

      // Add other query parameters
      searchParams.forEach((value, key) => {
        if (
          key !== "id" &&
          key !== "featured" &&
          key !== "category" &&
          key !== "page" &&
          key !== "per_page"
        ) {
          categoryParams[key] = value;
        }
      });

      const categoryProducts = await getProductsByCategory(
        Number(categoryId),
        categoryParams
      );
      return NextResponse.json(categoryProducts);
    }

    // Build query parameters for WooCommerce API
    const params: Record<string, string | number> = {};

    // Add pagination parameters
    if (page) {
      params.page = parseInt(page);
    }
    if (perPage) {
      params.per_page = parseInt(perPage);
    }

    // Add other query parameters
    searchParams.forEach((value, key) => {
      if (
        key !== "id" &&
        key !== "featured" &&
        key !== "category" &&
        key !== "page" &&
        key !== "per_page"
      ) {
        params[key] = value;
      }
    });

    // Use pagination function if page or per_page is specified
    if (page || perPage) {
      const result = await getProductsWithPagination(params);
      return NextResponse.json(result);
    }

    // Otherwise fetch all products with any provided query params
    const products = await getProducts(params);
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

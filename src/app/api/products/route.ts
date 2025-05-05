import { NextResponse } from "next/server";
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getProductsByCategory,
} from "@/lib/services/woocommerce/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const featured = searchParams.get("featured");
    const categoryId = searchParams.get("category");

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
      const categoryProducts = await getProductsByCategory(Number(categoryId));
      return NextResponse.json(categoryProducts);
    }

    // Otherwise fetch all products with any provided query params
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== "id" && key !== "featured" && key !== "category") {
        params[key] = value;
      }
    });

    const products = await getProducts(params);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error in products API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

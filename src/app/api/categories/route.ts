import { NextResponse } from "next/server";
import {
  getProductCategories,
  getProductCategoryById,
} from "@/lib/services/woocommerce/categories";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // If ID is provided, fetch a specific category
    if (id && !isNaN(Number(id))) {
      const category = await getProductCategoryById(Number(id));
      return NextResponse.json(category);
    }

    // Otherwise fetch all categories with any provided query params
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const categories = await getProductCategories(params);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error in categories API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch product categories" },
      { status: 500 }
    );
  }
}

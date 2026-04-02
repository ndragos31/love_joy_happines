import { unstable_cache } from "next/cache";
import wooCommerceClient from "./client";
import { Category } from "@/lib/types/category";

/**
 * Fetches all product categories from WooCommerce
 * @param {Object} options - Query parameters for the API request
 * @returns {Promise<Array>} - A promise that resolves to an array of categories
 */
export const getProductCategories = unstable_cache(
  async (options: Record<string, string | number> = {}): Promise<Category[]> => {
    const response = await wooCommerceClient.get("products/categories", options);
    return response.data as Category[];
  },
  ["product-categories"],
  { revalidate: 3600 }
);

/**
 * Fetches a specific product category by ID
 * @param {number} id - Category ID
 * @returns {Promise<Object>} - A promise that resolves to the category object
 */
export async function getProductCategoryById(id: number) {
  try {
    const response = await wooCommerceClient.get(`products/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

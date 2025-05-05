import wooCommerceClient from "./client";

/**
 * Fetches all product categories from WooCommerce
 * @param {Object} options - Query parameters for the API request
 * @returns {Promise<Array>} - A promise that resolves to an array of categories
 */
export async function getProductCategories(options = {}) {
  try {
    const response = await wooCommerceClient.get(
      "products/categories",
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching WooCommerce product categories:", error);
    throw error;
  }
}

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
    console.error(
      `Error fetching WooCommerce product category with ID ${id}:`,
      error
    );
    throw error;
  }
}

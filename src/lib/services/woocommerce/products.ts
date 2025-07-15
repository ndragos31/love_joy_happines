import wooCommerceClient from "./client";

/**
 * Fetches all products from WooCommerce
 * @param {Object} options - Query parameters for the API request
 * @returns {Promise<Array>} - A promise that resolves to an array of products
 */
export async function getProducts(options = {}) {
  try {
    const response = await wooCommerceClient.get("products", options);
    return response.data;
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
    throw error;
  }
}

/**
 * Fetches products with pagination info from WooCommerce
 * @param {Object} options - Query parameters for the API request
 * @returns {Promise<Object>} - A promise that resolves to an object with products, total, and totalPages
 */
export async function getProductsWithPagination(options = {}) {
  try {
    const response = await wooCommerceClient.get("products", options);
    return {
      products: response.data,
      total: parseInt(response.headers["x-wp-total"] || "0"),
      totalPages: parseInt(response.headers["x-wp-totalpages"] || "0"),
    };
  } catch (error) {
    console.error(
      "Error fetching WooCommerce products with pagination:",
      error
    );
    throw error;
  }
}

/**
 * Fetches a specific product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} - A promise that resolves to the product object
 */
export async function getProductById(id: number) {
  try {
    const response = await wooCommerceClient.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching WooCommerce product with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches featured products
 * @returns {Promise<Array>} - A promise that resolves to an array of featured products
 */
export async function getFeaturedProducts() {
  try {
    const response = await wooCommerceClient.get("products", {
      featured: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching featured WooCommerce products:", error);
    throw error;
  }
}

/**
 * Fetches products by category ID
 * @param {number} categoryId - Category ID
 * @returns {Promise<Array>} - A promise that resolves to an array of products
 */
export async function getProductsByCategory(categoryId: number) {
  try {
    const response = await wooCommerceClient.get("products", {
      category: categoryId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
}

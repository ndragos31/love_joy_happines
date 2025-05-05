import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Initialize the WooCommerce API client
const wooCommerceClient = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL || "https://lovejoyhappiness.store",
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "",
  version: "wc/v3",
});

export default wooCommerceClient;

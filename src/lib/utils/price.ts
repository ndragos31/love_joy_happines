import { CartItem } from "@/lib/context/CartContext";

/**
 * Returns the effective per-unit price for a cart item based on its quantity.
 * 
 * It looks for the "Cantitate" attribute on the product and parses its options
 * to build pricing tiers (e.g. "200 – 499 bucăți: 4 lei / buc."). The price
 * returned corresponds to the tier that the current cart item quantity falls into.
 * 
 * If no tier matches or the attribute is missing, it falls back to the product's base price.
 */
export function getItemEffectivePrice(item: CartItem): number {
  if (!item.product || !item.product.attributes) {
    return parseFloat(item.product.price);
  }

  // 1. Find the Cantitate attribute on the base product
  const cantitateAttr = item.product.attributes.find(
    (a) => a.name.toLowerCase() === "cantitate"
  );

  // 2. Parse options into tiers and evaluate based on item.quantity
  if (cantitateAttr && cantitateAttr.options && cantitateAttr.options.length > 0) {
    // Parse all tiers first
    const tiers = cantitateAttr.options.map((option) => {
      // Handles formats like "200 – 499 bucăți: 4 lei" or "600 - 1000 bucăți: 3,5 lei"
      const match = option.match(/^(\d+)\s*[-–]\s*(\d+).*?:\s*(\d+(?:[.,]\d+)?)\s*lei/i);
      
      if (match) {
        return {
          min: parseInt(match[1], 10),
          max: parseInt(match[2], 10),
          price: parseFloat(match[3].replace(",", ".")),
        };
      }
      return null;
    }).filter(Boolean) as { min: number; max: number; price: number }[];

    // Sort by min descending (highest quantities first)
    tiers.sort((a, b) => b.min - a.min);

    // Find the tier that the current quantity falls into
    for (const tier of tiers) {
      if (item.quantity >= tier.min) {
        // Even if the quantity exceeds the max of the highest tier, 
        // we lock in the highest tier's discount price.
        if (item.quantity <= tier.max || tier === tiers[0]) {
          return tier.price;
        }
      }
    }
  }

  // Fallback to the product base price
  return parseFloat(item.product.price);
}

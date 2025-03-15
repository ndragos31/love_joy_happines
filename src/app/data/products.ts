export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
  details?: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = [
  {
    id: "sticker-001",
    name: "Happy Rainbow Sticker",
    price: 3.99,
    image: "/images/products/sticker-rainbow.jpg",
    category: "Stickers",
    description:
      "A vibrant rainbow sticker that brings joy to any surface. Waterproof and durable.",
    featured: true,
    bestSeller: true,
    details:
      "Our Happy Rainbow Sticker is made from high-quality vinyl that's waterproof and UV-resistant. Perfect for laptops, water bottles, notebooks, or anywhere you want to add a splash of color and happiness.",
    sizes: ['Small (2")', 'Medium (3")', 'Large (4")'],
    colors: ["Vibrant", "Pastel"],
  },
  {
    id: "sticker-002",
    name: "Love Heart Collection",
    price: 7.99,
    image: "/images/products/sticker-hearts.jpg",
    category: "Stickers",
    description:
      "A set of 5 heart-shaped stickers in different colors. Spread love everywhere!",
    new: true,
    details:
      "This collection includes 5 heart-shaped stickers in pink, red, purple, blue, and yellow. Each sticker is made from premium vinyl material that's waterproof and scratch-resistant.",
    sizes: ['Standard (2.5")'],
    colors: ["Multi-color"],
  },
  {
    id: "sticker-003",
    name: "Positive Affirmations Pack",
    price: 9.99,
    image: "/images/products/sticker-affirmations.jpg",
    category: "Stickers",
    description:
      "A pack of 10 stickers with positive affirmations to brighten your day.",
    bestSeller: true,
    details:
      "Start your day with positivity! This pack includes 10 stickers with uplifting messages like 'You Got This', 'Be Kind', 'Stay Positive', and more. Perfect for planners, journals, or anywhere you need a little motivation.",
    sizes: ['Standard (2")'],
    colors: ["Colorful Mix"],
  },
  {
    id: "banner-001",
    name: "Celebration Banner",
    price: 15.99,
    image: "/images/products/banner-celebration.jpg",
    category: "Banners",
    description:
      "A colorful banner perfect for birthdays, graduations, or any celebration.",
    featured: true,
    details:
      "Make any celebration special with our Celebration Banner. This 6-foot banner features vibrant colors and festive designs. Made from durable material that can be used indoors or outdoors.",
    sizes: ["Standard (6' x 1')"],
    colors: ["Rainbow", "Gold & Silver", "Pastel"],
  },
  {
    id: "banner-002",
    name: "Custom Text Banner",
    price: 19.99,
    image: "/images/products/banner-custom.jpg",
    category: "Banners",
    description:
      "Personalize your own banner with custom text and colors for any occasion.",
    new: true,
    details:
      "Create a personalized banner for your special event. Choose your text, colors, and design elements. Our custom banners are printed on high-quality vinyl and include grommets for easy hanging.",
    sizes: ["Small (4' x 1')", "Medium (6' x 1')", "Large (8' x 1.5')"],
    colors: ["Custom"],
  },
  {
    id: "banner-003",
    name: "Love Joy Happiness Banner",
    price: 12.99,
    image: "/images/products/banner-ljh.jpg",
    category: "Banners",
    description:
      "Our signature banner featuring our 'Love Joy Happiness' motto in beautiful typography.",
    bestSeller: true,
    details:
      "Spread the message of Love, Joy, and Happiness with our signature banner. Features our logo and motto in our brand colors on a premium fabric banner that's perfect for home decor or events.",
    sizes: ["Standard (5' x 1')"],
    colors: ["Brand Colors"],
  },
  {
    id: "merch-001",
    name: "Happy Tote Bag",
    price: 14.99,
    image: "/images/products/merch-tote.jpg",
    category: "Merchandise",
    description:
      "A sturdy canvas tote bag with our colorful 'Happy' design. Perfect for shopping or beach days.",
    featured: true,
    details:
      "Our Happy Tote Bag is made from 100% cotton canvas with reinforced handles. The vibrant 'Happy' design is printed using eco-friendly inks. Spacious enough for groceries, books, or beach essentials.",
    sizes: ["One Size"],
    colors: ["Natural with Colorful Print"],
  },
  {
    id: "merch-002",
    name: "Joy Coffee Mug",
    price: 11.99,
    image: "/images/products/merch-mug.jpg",
    category: "Merchandise",
    description:
      "Start your day with joy! A ceramic mug with our colorful 'Joy' design.",
    bestSeller: true,
    details:
      "Our Joy Coffee Mug holds 11oz of your favorite beverage. Made from high-quality ceramic with a comfortable handle and our exclusive 'Joy' design. Microwave and dishwasher safe.",
    sizes: ["Standard (11oz)"],
    colors: ["White with Colorful Print"],
  },
  {
    id: "merch-003",
    name: "Love Joy Happiness T-Shirt",
    price: 24.99,
    image: "/images/products/merch-tshirt.jpg",
    category: "Merchandise",
    description:
      "A soft, comfortable t-shirt featuring our 'Love Joy Happiness' logo and colorful design.",
    new: true,
    details:
      "Wear the message of Love, Joy, and Happiness wherever you go! Our premium t-shirt is made from 100% organic cotton for maximum comfort. Features our logo and colorful design on the front.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Light Blue"],
  },
];

export const featuredProducts = products.filter((product) => product.featured);
export const newProducts = products.filter((product) => product.new);
export const bestSellers = products.filter((product) => product.bestSeller);

export const getProductsByCategory = (category: string) => {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};

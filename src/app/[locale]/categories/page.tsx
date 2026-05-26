import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import { getProductCategories } from "@/lib/services/woocommerce/categories";
import { Category } from "@/lib/types/category";

export default async function CategoriesPage() {
  let categories: Category[] = [];
  try {
    categories = await getProductCategories({ per_page: 100 });
  } catch {
    // gracefully render without categories
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Categories categories={categories} />
      </main>
      <Footer />
    </div>
  );
}

import { useTranslations } from "next-intl";
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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <CategoriesHeader />
        <div className="container-custom pb-20 md:pb-28">
          <Categories categories={categories} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CategoriesHeader() {
  const t = useTranslations("home.categories");

  return (
    <header className="container-custom pt-14 pb-10 md:pt-20 md:pb-14">
      <h1 className="font-display text-5xl font-medium tracking-tight text-balance md:text-7xl">
        {t("heading")}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-pretty text-muted">{t("subheading")}</p>
    </header>
  );
}

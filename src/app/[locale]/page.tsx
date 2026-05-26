import { useTranslations } from "next-intl";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import { getProductCategories } from "@/lib/services/woocommerce/categories";
import { Category } from "@/lib/types/category";

export default async function Home() {
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
        <Hero initialCategories={categories} />
        <Categories categories={categories} />

        {/* Decorative Divider Above Testimonials */}
        <div className="py-10 bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="flex items-center justify-center">
              <div className="w-1/4 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent"></div>
              <div className="mx-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div className="w-1/4 h-px bg-gradient-to-r from-secondary/60 via-secondary/60 to-transparent"></div>
            </div>
          </div>
        </div>

        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

const avatarClasses = [
  { bg: "bg-primary/20", text: "text-primary" },
  { bg: "bg-secondary/20", text: "text-secondary" },
  { bg: "bg-accent/20", text: "text-accent dark:text-yellow-400" },
];

function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as { author: string; initials: string; quote: string }[];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("heading")}
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {t("subheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const colors = avatarClasses[index % avatarClasses.length];
            return (
              <div key={item.author} className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center mr-4`}>
                    <span className={`${colors.text} font-bold`}>{item.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.author}</h4>
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

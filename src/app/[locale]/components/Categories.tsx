import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Category } from "@/lib/types/category";

// Custom order: 1.Etichete RO, 2.Etichete EN, 3.Etichete HU, 4.Flyere, 5.Tricouri, 6.Autocolante, 7.Agende, 8.Cărți, 9.Accesorii, 10.Sticluțe
const PRIORITY_ORDER = [22, 32, 33, 24, 30, 23, 29, 31, 26, 28];

export const sortCategories = (categories: Category[]) =>
  [...categories].sort((a, b) => {
    const aIndex = PRIORITY_ORDER.indexOf(a.id);
    const bIndex = PRIORITY_ORDER.indexOf(b.id);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.menu_order - b.menu_order;
  });

export default function Categories({ categories: rawCategories }: { categories: Category[] }) {
  const t = useTranslations("home.categories");
  const categories = sortCategories(rawCategories);

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[16rem] lg:grid-cols-4">
      {categories.map((category, index) => {
        const isFeatured = index === 0;
        const hasImage = Boolean(category.image?.src);

        return (
          <li key={category.id} className={isFeatured ? "col-span-2 lg:row-span-2" : ""}>
            <Link
              href={`/categories/${category.slug}`}
              className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-sand p-5 lg:aspect-auto ${
                isFeatured ? "aspect-square sm:p-8" : "aspect-4/5"
              }`}
            >
              {hasImage && (
                <>
                  <Image
                    src={category.image.src}
                    alt={category.image.alt || category.name}
                    fill
                    sizes={isFeatured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                    priority={index < 3}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/65 via-45% to-transparent to-85%" />
                </>
              )}

              <span className="absolute top-4 right-4 grid size-10 -translate-y-1 place-items-center rounded-full bg-background/90 text-foreground opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>

              <span className={`relative ${hasImage ? "text-white" : ""}`}>
                <span
                  className={`block font-display leading-tight font-medium text-balance ${
                    isFeatured ? "text-3xl sm:text-4xl" : "text-lg sm:text-xl"
                  }`}
                >
                  {category.name}
                </span>
                {category.count > 0 && (
                  <span className="mt-1.5 block text-sm opacity-80">
                    {t("productCount", { count: category.count })}
                  </span>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

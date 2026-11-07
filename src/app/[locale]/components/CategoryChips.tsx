import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Category } from "@/lib/types/category";
import { sortCategories } from "./Categories";

const chipClassName =
  "flex h-11 items-center gap-2.5 rounded-full border py-1.5 pr-4 text-sm font-medium whitespace-nowrap transition-colors";

export default function CategoryChips({
  categories,
  activeSlug,
  showAllProducts = false,
}: {
  categories: Category[];
  activeSlug?: string;
  showAllProducts?: boolean;
}) {
  const t = useTranslations("home.categories");
  if (categories.length === 0) return null;

  const stateClassName = (isActive: boolean) =>
    isActive
      ? "border-foreground bg-foreground text-background"
      : "border-line bg-surface hover:border-foreground/40";

  return (
    <nav aria-label={t("heading")}>
      <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8">
        {showAllProducts && (
          <li className="shrink-0">
            <Link
              href="/products"
              aria-current={activeSlug ? undefined : "page"}
              className={`${chipClassName} pl-4 ${stateClassName(!activeSlug)}`}
            >
              {t("allProducts")}
            </Link>
          </li>
        )}
        {sortCategories(categories).map((category) => {
          const isActive = category.slug === activeSlug;
          return (
            <li key={category.id} className="shrink-0">
              <Link
                href={`/categories/${category.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`${chipClassName} pl-1.5 ${stateClassName(isActive)}`}
              >
                <span className="relative size-8 overflow-hidden rounded-full bg-sand">
                  {category.image?.src && (
                    <Image src={category.image.src} alt="" fill sizes="32px" className="object-cover" />
                  )}
                </span>
                {category.name}
                <span className={`tabular-nums ${isActive ? "text-background/60" : "text-muted"}`}>
                  {category.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";

export default function Categories() {
  const categories = [
    {
      name: "Autocolante",
      description: "Autocolante colorate pentru a-ți înviora ziua",
      image: "/images/categories/stickers.jpg",
      link: "/stickers",
      color: "from-primary/20 to-primary/40",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    },
    {
      name: "Bannere",
      description: "Bannere personalizate pentru orice ocazie",
      image: "/images/categories/banners.jpg",
      link: "/banners",
      color: "from-secondary/20 to-secondary/40",
      icon: (
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
            strokeWidth={2}
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
      ),
    },
    {
      name: "Produse",
      description: "Răspândește bucurie cu produsele noastre personalizate",
      image: "/images/categories/merchandise.jpg",
      link: "/merchandise",
      color: "from-accent/20 to-accent/40",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-accent dark:text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-gray-light dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cumpără după Categorie
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Răsfoiește colecția noastră de produse concepute pentru a aduce
            bucurie în viața ta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link href={category.link} key={category.name} className="group">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
                <div
                  className={`h-48 relative bg-gradient-to-br ${category.color}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {category.icon}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-foreground/70 mb-4 flex-grow">
                    {category.description}
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Vezi Toate</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

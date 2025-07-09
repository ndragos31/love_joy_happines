"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-light dark:bg-gray-900">
      {/* Top decorative section with background */}
      <div className="bg-primary/5 dark:bg-primary/10 py-6 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="h-px w-12 bg-primary/30"></div>
              <div className="w-3 h-3 rotate-45 bg-primary/20"></div>
              <div className="text-primary font-medium">Love Joy Happiness</div>
              <div className="w-3 h-3 rotate-45 bg-primary/20"></div>
              <div className="h-px w-12 bg-primary/30"></div>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 dark:bg-primary/5"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/5 dark:bg-primary/5"></div>
      </div>

      <div className="container-custom pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-primary mb-4">
              Love Joy Happiness
            </h3>
            <p className="text-foreground mb-4">
              Aducem culoare și bucurie în viața ta cu autocolantele, bannerele
              și produsele noastre frumoase.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/people/Love-Joy-Happiness/61571091636918/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Link-uri Rapide</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Acasă
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Toate Produsele
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/autocolante"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Autocolante
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/etichete"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Etichete
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/flyere"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Flyere
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Despre Noi
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Servicii Clienți</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Contactează-ne
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Politica de Confidențialitate
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Termeni și Condiții
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="mt-12 mb-8 flex items-center justify-center">
          <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700 max-w-xs"></div>
          <div className="mx-4 flex space-x-2">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            <span className="h-2 w-2 rounded-full bg-primary opacity-75"></span>
            <span className="h-2 w-2 rounded-full bg-primary opacity-50"></span>
          </div>
          <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700 max-w-xs"></div>
        </div>

        <div className="text-center">
          <p className="text-foreground">
            &copy; {new Date().getFullYear()} Love Joy Happiness. Toate
            drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}

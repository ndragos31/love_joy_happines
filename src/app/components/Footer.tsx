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
                href="https://facebook.com"
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
              <a
                href="https://instagram.com"
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
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
                  href="/stickers"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Autocolante
                </Link>
              </li>
              <li>
                <Link
                  href="/banners"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Bannere
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
                  href="/faq"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Întrebări Frecvente
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Livrare și Returnări
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

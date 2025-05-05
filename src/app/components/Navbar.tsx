"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary transition-colors duration-300">
              Love Joy Happiness
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Acasă
            </Link>
            <Link
              href="/products"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Produse
            </Link>
            <Link
              href="/stickers"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Autocolante
            </Link>
            <Link
              href="/banners"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Bannere
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Despre
            </Link>
          </div>

          {/* Cart and Account */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/cart"
              className="text-foreground hover:text-primary transition-colors duration-200 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary focus:outline-none transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Acasă
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Produse
              </Link>
              <Link
                href="/stickers"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Autocolante
              </Link>
              <Link
                href="/banners"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Bannere
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Despre
              </Link>
              <div className="flex space-x-4 pt-2">
                <Link
                  href="/cart"
                  className="text-foreground hover:text-primary transition-colors duration-200 relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

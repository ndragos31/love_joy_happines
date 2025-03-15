"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Add scroll event listener to detect when page is scrolled
  useEffect(() => {
    // Set initial state based on scroll position
    if (window.scrollY > 10) {
      setIsScrolled(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update spacer height when navbar becomes fixed
  useEffect(() => {
    // Always keep the navbar fixed at the top, but translate it out of view when not scrolled
    // This prevents layout shifts when transitioning to fixed position
    const navbar = navRef.current;
    const spacer = document.getElementById("navbar-spacer");

    if (navbar && spacer) {
      // Set spacer height to match navbar height immediately on mount
      spacer.style.height = `${navbar.offsetHeight}px`;
    }

    // Also update on resize
    const updateSpacerHeight = () => {
      if (navbar && spacer) {
        spacer.style.height = `${navbar.offsetHeight}px`;
      }
    };

    window.addEventListener("resize", updateSpacerHeight);

    return () => {
      window.removeEventListener("resize", updateSpacerHeight);
    };
  }, []);

  return (
    <>
      {/* Always fixed navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "translate-y-0 bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm"
            : "translate-y-0 bg-white dark:bg-gray-900 shadow-sm"
        }`}
      >
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
                Home
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                href="/stickers"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Stickers
              </Link>
              <Link
                href="/banners"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Banners
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                About
              </Link>
            </div>

            {/* Cart and Account */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/account"
                className="text-foreground hover:text-primary transition-colors duration-200"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
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
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  Products
                </Link>
                <Link
                  href="/stickers"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  Stickers
                </Link>
                <Link
                  href="/banners"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  Banners
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  About
                </Link>
                <div className="flex space-x-4 pt-2">
                  <Link
                    href="/account"
                    className="text-foreground hover:text-primary transition-colors duration-200"
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </Link>
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

      {/* Spacer div to prevent content from jumping */}
      <div id="navbar-spacer" className="w-full"></div>
    </>
  );
}

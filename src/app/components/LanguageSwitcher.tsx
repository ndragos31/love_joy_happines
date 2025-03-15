"use client";

import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-0.5 shadow-sm">
        <button
          onClick={() => setLanguage("en")}
          className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 px-3 py-1 ${
            language === "en"
              ? "text-white font-medium"
              : "text-gray-600 dark:text-gray-300"
          }`}
          aria-label="Switch to English"
        >
          <span className="text-sm">EN</span>
        </button>

        <button
          onClick={() => setLanguage("ro")}
          className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 px-3 py-1 ${
            language === "ro"
              ? "text-white font-medium"
              : "text-gray-600 dark:text-gray-300"
          }`}
          aria-label="Switch to Romanian"
        >
          <span className="text-sm">RO</span>
        </button>

        {/* Animated background pill */}
        <div
          className={`absolute top-0.5 bottom-0.5 w-1/2 rounded-full bg-primary transition-all duration-300 ${
            language === "en" ? "left-0.5" : "left-[calc(50%-2px)]"
          }`}
        ></div>
      </div>
    </div>
  );
}

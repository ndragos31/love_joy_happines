"use client";

import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex items-center">
      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1 shadow-inner">
        <button
          onClick={() => setLanguage("en")}
          className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
            language === "en"
              ? "bg-white dark:bg-gray-700 shadow-sm text-primary font-medium"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          } h-8 w-10`}
          aria-label="Switch to English"
        >
          <span className="text-sm font-medium">EN</span>
          {language === "en" && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
          )}
        </button>
        <button
          onClick={() => setLanguage("ro")}
          className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
            language === "ro"
              ? "bg-white dark:bg-gray-700 shadow-sm text-primary font-medium"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          } h-8 w-10`}
          aria-label="Switch to Romanian"
        >
          <span className="text-sm font-medium">RO</span>
          {language === "ro" && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
          )}
        </button>
      </div>
    </div>
  );
}

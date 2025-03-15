"use client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

type NestedObject = {
  [key: string]: string | NestedObject;
};

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string) => {
    // Split the key by dots to access nested properties
    const keys = key.split(".");
    let value: any = translations[language];

    // Navigate through the nested properties
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // If the key doesn't exist, return the key itself
        return key;
      }
    }

    return value as string;
  };

  return { t, language };
}

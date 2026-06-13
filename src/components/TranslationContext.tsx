"use client";

import React, { createContext, useContext, useState } from "react";
import { Language, translations } from "@/data/translations";

type TranslationContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.en) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("preferred_lang");
    return saved === "en" || saved === "ne" ? saved : "en";
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "ne" : "en";
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred_lang", next);
      }
      return next;
    });
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || "";
  };

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

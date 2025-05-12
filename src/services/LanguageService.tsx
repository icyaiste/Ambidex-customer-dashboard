import { useState, useEffect, createContext, useContext } from "react";
import {LanguageContextType, LanguageServiceProps,
} from "../interfaces/LanguageServiceInterface";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

function LanguageService({ children }: LanguageServiceProps) {
  const [language, setLanguage] = useState("sv"); // Default language
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchContent(lang: string) {
      try {
        if (lang === "sv") {
          const module = await import("../locales/sv_SE.js");
          setContent(module.sv_SE as Record<string, string>);
        } else if (lang === "eng") {
          const module = await import("../locales/eng_US.js");
          setContent(module.eng_US);
        }
      } catch (error) {
        console.error(`Error loading language file for ${lang}:`, error);
      }
    }
    fetchContent(language);
  }, [language]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, content, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the LanguageContext in components.
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageService;

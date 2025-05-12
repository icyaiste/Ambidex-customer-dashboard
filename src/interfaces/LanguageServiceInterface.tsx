import { ReactNode } from "react";

interface LanguageContextType {
    language: string;
    content: Record<string, string>;
    changeLanguage: (lang: string) => void;
  }

  interface LanguageServiceProps {
    children: ReactNode;
  }
  

export {LanguageContextType, LanguageServiceProps};
  
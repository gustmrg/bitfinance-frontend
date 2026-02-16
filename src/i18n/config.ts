import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enUS from "./locales/en-US.json";
import ptBR from "./locales/pt-BR.json";

export const supportedLanguages = ["en-US", "pt-BR"] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "en-US": { translation: enUS },
      "pt-BR": { translation: ptBR },
    },
    supportedLngs: [...supportedLanguages],
    fallbackLng: "en-US",
    debug: import.meta.env.DEV,
    detection: {
      order: ["navigator", "htmlTag", "path", "subdomain"],
      caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

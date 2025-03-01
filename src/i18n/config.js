import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    backend: {
      loadPath: "/bitfinance/src/i18n/locales/{{lng}}/translation.json",
    },
    detection: {
      order: ["navigator", "htmlTag", "path", "subdomain"], // Ordem de detecção
      caches: [], // Não usar cache
    },
  });

// Log do idioma detectado
console.log("Idioma detectado:", i18n.language);

export default i18n;

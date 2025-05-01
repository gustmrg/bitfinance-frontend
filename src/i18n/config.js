import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: "en-US",
      debug: process.env.NODE_ENV === "development",
      backend: {
        loadPath: "/bitfinance/locales/{{lng}}/translation.json",
      },
      detection: {
        order: ["navigator", "htmlTag", "path", "subdomain"],
        caches: [],
      },
      loadLocale: (lng, ns) => {
        if (lng === "pt") {
          return "pt-BR";
        }
        return lng;
      },
    },
    (err, t) => {
      if (err) return console.error("i18next initialization failed:", err);

      console.log("Idioma detectado:", i18n.language);
    }
  );

export default i18n;

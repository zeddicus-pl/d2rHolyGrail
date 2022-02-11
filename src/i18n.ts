import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pl from "../locale/pl.json";

i18n
  .use(initReactI18next)
  .init({
    resources: { pl: { translation: pl } },
    lng: window.Main.getSetting("lang"),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;

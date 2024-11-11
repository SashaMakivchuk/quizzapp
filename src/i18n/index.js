import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";
import es from "@/locales/es.json";
import uk from "@/locales/uk.json";

const i18n = createI18n({
  legacy: false, // Ensure Vue 3's Composition API mode is enabled
  locale: "en", // Default language
  messages: {
    en,
    fr,
    de,
    es,
    uk,
  },
});

export default i18n;

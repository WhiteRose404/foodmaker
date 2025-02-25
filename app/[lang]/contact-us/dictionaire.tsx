const dictionaries = {
    en: () => import('../i18n/contact-us/en.json').then((module) => module.default),
    fr: () => import('../i18n/contact-us/fr.json').then((module) => module.default),
    ar: () => import('../i18n/contact-us/ar.json').then((module) => module.default),
  }
  
export const getDictionary = async (locale: "en" | "fr" | "ar" ) => dictionaries[locale]();

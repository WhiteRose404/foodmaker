const dictionaries = {
    en: () => import('./i18n/home/en.json').then((module) => module.default),
    fr: () => import('./i18n/home/fr.json').then((module) => module.default),
    ar: () => import('./i18n/home/ar.json').then((module) => module.default),
  }
  
export const getDictionary = async (locale: "en" | "fr" | "ar" ) => dictionaries[locale]();

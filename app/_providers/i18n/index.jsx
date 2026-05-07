'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { translations } from '@/lib';

const STORAGE_KEY = 'portfolio-lang';
const DEFAULT_LANG = 'es';

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  toggleLang: () => {},
  t: key => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored]) {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(prev => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const t = useCallback(
    key => {
      const segments = key.split('.');
      let result = translations[lang];
      for (const segment of segments) {
        if (result == null) return key;
        result = result[segment];
      }
      return result ?? key;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

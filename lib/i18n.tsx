'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Language, T } from './translations'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: T
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  const t = translations[lang]
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)

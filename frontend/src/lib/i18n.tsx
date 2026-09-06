import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { messages, type Locale, type MessageKey } from "./translations";
import { noHyphen } from "./noHyphen";

const STORAGE_KEY = "mboa_locale";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function readStoredLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "fr" ? "fr" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const t = useCallback(
    (key: MessageKey) => noHyphen(messages[locale][key] ?? messages.en[key]),
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

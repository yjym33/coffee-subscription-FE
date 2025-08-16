import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Language = "ko" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "ko",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : (undefined as unknown as Storage)
      ),
    }
  )
);

import { useLanguageStore } from "@/store/language-store";

export function useLanguage() {
  return useLanguageStore();
}
import koMessages from "../messages/ko.json";
import enMessages from "../messages/en.json";

export type Language = "ko" | "en";

const messages = {
  ko: koMessages,
  en: enMessages,
};

export function getMessages(language: Language) {
  return messages[language];
}

export function t(key: string, language: Language): string {
  const messageObject = getMessages(language);
  const keys = key.split(".");

  let value: any = messageObject;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === "string" ? value : key;
}

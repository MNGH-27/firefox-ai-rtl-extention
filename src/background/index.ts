import { browser } from "@/shared/browser";
import { DEFAULT_SETTINGS } from "@/shared/types";

browser.runtime.onInstalled.addListener(async () => {
  const stored = await browser.storage.local.get("settings");
  if (!stored.settings) {
    await browser.storage.local.set({ settings: DEFAULT_SETTINGS });
  }
});

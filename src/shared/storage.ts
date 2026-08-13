import { browser, type StorageChange } from "./browser";
import {
  DEFAULT_SETTINGS,
  type ExtensionSettings,
  type SiteId,
} from "./types";

const STORAGE_KEY = "settings";

function mergeSettings(raw: unknown): ExtensionSettings {
  const base = structuredClone(DEFAULT_SETTINGS);
  if (!raw || typeof raw !== "object") return base;

  const incoming = raw as Partial<ExtensionSettings>;
  if (!incoming.sites) return base;

  for (const id of Object.keys(base.sites) as SiteId[]) {
    const site = incoming.sites[id];
    if (site && typeof site.enabled === "boolean") {
      base.sites[id].enabled = site.enabled;
    }
  }
  return base;
}

export async function getSettings(): Promise<ExtensionSettings> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  return mergeSettings(result[STORAGE_KEY]);
}

export async function setSettings(
  settings: ExtensionSettings
): Promise<void> {
  await browser.storage.local.set({ [STORAGE_KEY]: settings });
}

export async function setSiteEnabled(
  siteId: SiteId,
  enabled: boolean
): Promise<ExtensionSettings> {
  const settings = await getSettings();
  settings.sites[siteId].enabled = enabled;
  await setSettings(settings);
  return settings;
}

export function onSettingsChanged(
  callback: (settings: ExtensionSettings) => void
): () => void {
  const listener = (
    changes: Record<string, StorageChange>,
    area: string
  ) => {
    if (area !== "local" || !(STORAGE_KEY in changes)) return;
    callback(mergeSettings(changes[STORAGE_KEY].newValue));
  };

  browser.storage.onChanged.addListener(listener);
  return () => browser.storage.onChanged.removeListener(listener);
}

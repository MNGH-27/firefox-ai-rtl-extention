/** Thin wrapper around Firefox's native WebExtension API. */

export interface StorageChange {
  oldValue?: unknown;
  newValue?: unknown;
}

type StorageChangeListener = (
  changes: Record<string, StorageChange>,
  areaName: string
) => void;

interface BrowserStorage {
  local: {
    get: (
      keys?: string | string[] | Record<string, unknown> | null
    ) => Promise<Record<string, unknown>>;
    set: (items: Record<string, unknown>) => Promise<void>;
  };
  onChanged: {
    addListener: (listener: StorageChangeListener) => void;
    removeListener: (listener: StorageChangeListener) => void;
  };
}

interface BrowserRuntime {
  onInstalled: {
    addListener: (callback: () => void) => void;
  };
}

export interface ExtensionBrowser {
  storage: BrowserStorage;
  runtime: BrowserRuntime;
}

export const browser = (globalThis as unknown as { browser: ExtensionBrowser })
  .browser;

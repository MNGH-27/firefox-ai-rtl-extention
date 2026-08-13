export type SiteId = "gemini" | "chatgpt" | "claude";

export interface SiteSettings {
  enabled: boolean;
}

export type SettingsMap = Record<SiteId, SiteSettings>;

export interface ExtensionSettings {
  sites: SettingsMap;
}

export const DEFAULT_SETTINGS: ExtensionSettings = {
  sites: {
    gemini: { enabled: true },
    chatgpt: { enabled: true },
    claude: { enabled: true },
  },
};

export const SITE_META: Record<
  SiteId,
  { label: string; hostHint: string; color: string }
> = {
  gemini: {
    label: "Gemini",
    hostHint: "gemini.google.com",
    color: "#4285F4",
  },
  chatgpt: {
    label: "ChatGPT",
    hostHint: "chatgpt.com",
    color: "#10A37F",
  },
  claude: {
    label: "Claude",
    hostHint: "claude.ai",
    color: "#D97757",
  },
};

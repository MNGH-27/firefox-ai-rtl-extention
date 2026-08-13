import { chatgptAdapter } from "./chatgpt";
import { claudeAdapter } from "./claude";
import { geminiAdapter } from "./gemini";
import { matchHost, type SiteAdapter } from "./types";

export const SITE_ADAPTERS: SiteAdapter[] = [
  geminiAdapter,
  chatgptAdapter,
  claudeAdapter,
];

export function resolveAdapter(hostname: string): SiteAdapter | null {
  return SITE_ADAPTERS.find((adapter) => matchHost(adapter, hostname)) ?? null;
}

export type { SiteAdapter };
export { matchHost };

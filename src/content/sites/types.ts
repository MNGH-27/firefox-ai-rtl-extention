import type { SiteId } from "@/shared/types";

export interface SiteAdapter {
  id: SiteId;
  /** Host patterns this adapter handles */
  hosts: string[];
  /** Chat message body selectors only (not page chrome / sidebar) */
  messageSelectors: string[];
  /** Chat composer / prompt input only */
  inputSelectors: string[];
}

export function matchHost(adapter: SiteAdapter, hostname: string): boolean {
  return adapter.hosts.some(
    (host) => hostname === host || hostname.endsWith(`.${host}`)
  );
}

export function allTargetSelectors(adapter: SiteAdapter): string {
  return [...adapter.messageSelectors, ...adapter.inputSelectors].join(",");
}

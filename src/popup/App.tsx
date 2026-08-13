import { useEffect, useState } from "react";
import {
  getSettings,
  onSettingsChanged,
  setSiteEnabled,
} from "@/shared/storage";
import {
  SITE_META,
  type ExtensionSettings,
  type SiteId,
} from "@/shared/types";
import { Header } from "./components/Header";
import { SiteToggle } from "./components/SiteToggle";
import { GitHubLink } from "./components/GitHubLink";

export function App() {
  const [settings, setSettings] = useState<ExtensionSettings | null>(null);

  useEffect(() => {
    void getSettings().then(setSettings);
    return onSettingsChanged(setSettings);
  }, []);

  const handleToggle = async (siteId: SiteId, enabled: boolean) => {
    const next = await setSiteEnabled(siteId, enabled);
    setSettings(next);
  };

  if (!settings) {
    return (
      <div className="w-[300px] bg-panel px-4 py-5 text-sm text-muted">
        Loading…
      </div>
    );
  }

  return (
    <div className="w-[300px] overflow-hidden bg-[radial-gradient(120%_100%_at_100%_0%,#1a3d36_0%,#12201c_55%)] text-ink">
      <div className="flex flex-col gap-4 p-4">
        <Header />
        <section className="flex flex-col gap-2">
          {(Object.keys(SITE_META) as SiteId[]).map((siteId) => (
            <SiteToggle
              key={siteId}
              siteId={siteId}
              enabled={settings.sites[siteId].enabled}
              onChange={(enabled) => void handleToggle(siteId, enabled)}
            />
          ))}
        </section>
        <GitHubLink />
      </div>
    </div>
  );
}

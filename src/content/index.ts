import { getSettings, onSettingsChanged } from "@/shared/storage";
import { RtlEngine } from "./core/rtl-engine";
import { resolveAdapter } from "./sites";
import "./styles/rtl.css";

function boot() {
  const adapter = resolveAdapter(window.location.hostname);
  if (!adapter) return;

  const engine = new RtlEngine(adapter);

  const sync = async () => {
    const settings = await getSettings();
    engine.setEnabled(settings.sites[adapter.id].enabled);
  };

  void sync();
  onSettingsChanged((settings) => {
    engine.setEnabled(settings.sites[adapter.id].enabled);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

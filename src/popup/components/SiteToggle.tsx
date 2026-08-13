import { SITE_META, type SiteId } from "@/shared/types";

interface SiteToggleProps {
  siteId: SiteId;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function SiteToggle({ siteId, enabled, onChange }: SiteToggleProps) {
  const meta = SITE_META[siteId];
  const inputId = `toggle-${siteId}`;

  return (
    <label
      htmlFor={inputId}
      className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-line bg-panel-elevated/80 px-3 py-2.5 transition hover:border-white/15"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: meta.color }}
          aria-hidden
        />
        <div className="min-w-0">
          <div className="text-[13px] font-medium">{meta.label}</div>
          <div className="truncate text-[10px] text-muted">{meta.hostHint}</div>
        </div>
      </div>

      <span className="relative inline-flex shrink-0">
        <input
          id={inputId}
          type="checkbox"
          className="peer sr-only"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="h-6 w-[42px] rounded-full bg-[#35534c] transition peer-checked:bg-accent-soft peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent" />
        <span className="pointer-events-none absolute top-[3px] right-[3px] h-[18px] w-[18px] rounded-full bg-[#d7ebe5] transition peer-checked:-translate-x-[18px] peer-checked:bg-cyan-50" />
      </span>
    </label>
  );
}

import logoUrl from "../assets/logo.svg";

export function Header() {
  return (
    <header className="flex items-center gap-3">
      <img
        src={logoUrl}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl ring-1 ring-line"
      />
      <div>
        <h1 className="text-[15px] font-bold leading-tight">AI Chat RTL</h1>
        <p className="mt-0.5 text-[11px] text-muted">Gemini · ChatGPT · Claude</p>
      </div>
    </header>
  );
}

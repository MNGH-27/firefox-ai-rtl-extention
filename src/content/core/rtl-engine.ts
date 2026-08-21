import type { SiteAdapter } from "../sites/types";
import { allTargetSelectors } from "../sites/types";

const ATTR = "data-ai-chat-rtl";
const RTL_NODE_ATTR = "data-ai-chat-rtl-node";
const PERSIAN_ARABIC_PATTERN = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]/u;
const SKIP_SELECTOR =
  "pre, code, .code-block, .hljs, .katex, mjx-container, .math, [class*='CodeBlock'], nav, aside, header";

export class RtlEngine {
  private adapter: SiteAdapter;
  private observer: MutationObserver | null = null;
  private enabled = false;
  private inputListener = (event: Event) => {
    if (!this.enabled || !(event.target instanceof Element)) return;

    const target = event.target.closest(allTargetSelectors(this.adapter));
    if (target) this.updateDirection(target);
  };

  constructor(adapter: SiteAdapter) {
    this.adapter = adapter;
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    document.documentElement.setAttribute(ATTR, on ? "on" : "off");
    document.documentElement.setAttribute(`${ATTR}-site`, this.adapter.id);

    if (on) {
      this.applyToExisting();
      this.startObserver();
      document.addEventListener("input", this.inputListener, true);
    } else {
      this.clearMarked();
      document.removeEventListener("input", this.inputListener, true);
    }
  }

  private getText(el: Element): string {
    if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
      return el.value;
    }

    return el.textContent ?? "";
  }

  private updateDirection(el: Element) {
    if (el.closest(SKIP_SELECTOR)) return;
    // Avoid flipping page chrome if a selector accidentally matches
    if (el.closest("nav, aside, [data-testid='sidebar'], #stage-slideover-sidebar")) {
      return;
    }

    const htmlEl = el as HTMLElement;
    if (PERSIAN_ARABIC_PATTERN.test(this.getText(el))) {
      if (!el.hasAttribute(RTL_NODE_ATTR)) {
        el.setAttribute("data-ai-chat-rtl-original-dir", el.getAttribute("dir") ?? "");
        el.setAttribute(
          "data-ai-chat-rtl-original-unicode-bidi",
          htmlEl.style.unicodeBidi,
        );
      }
      el.setAttribute("dir", "rtl");
      el.setAttribute(RTL_NODE_ATTR, "1");
      htmlEl.style.unicodeBidi = "plaintext";
      return;
    }

    this.unmark(el);
  }

  private unmark(el: Element) {
    if (!el.hasAttribute(RTL_NODE_ATTR)) return;

    const originalDir = el.getAttribute("data-ai-chat-rtl-original-dir");
    if (originalDir) el.setAttribute("dir", originalDir);
    else el.removeAttribute("dir");

    const htmlEl = el as HTMLElement;
    const originalUnicodeBidi = el.getAttribute(
      "data-ai-chat-rtl-original-unicode-bidi",
    );
    if (originalUnicodeBidi) htmlEl.style.unicodeBidi = originalUnicodeBidi;
    else htmlEl.style.removeProperty("unicode-bidi");

    el.removeAttribute(RTL_NODE_ATTR);
    el.removeAttribute("data-ai-chat-rtl-original-dir");
    el.removeAttribute("data-ai-chat-rtl-original-unicode-bidi");
  }

  private clearMarked() {
    document
      .querySelectorAll(`[${RTL_NODE_ATTR}]`)
      .forEach((el) => this.unmark(el));
  }

  private applyToNode(node: Node) {
    if (!(node instanceof Element)) return;

    const selector = allTargetSelectors(this.adapter);
    if (node.matches?.(selector)) {
      this.updateDirection(node);
    }
    node.querySelectorAll?.(selector).forEach((el) => this.updateDirection(el));
  }

  private applyToExisting() {
    if (document.body) this.applyToNode(document.body);
  }

  private startObserver() {
    if (this.observer) return;
    this.observer = new MutationObserver((mutations) => {
      if (!this.enabled) return;
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          const parent = mutation.target.parentElement;
          const target = parent?.closest(allTargetSelectors(this.adapter));
          if (target) this.updateDirection(target);
          continue;
        }
        for (const node of mutation.addedNodes) {
          this.applyToNode(node);
          const parent = node.parentElement?.closest(
            allTargetSelectors(this.adapter),
          );
          if (parent) this.updateDirection(parent);
        }
      }
    });
    this.observer.observe(document.documentElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  destroy() {
    this.observer?.disconnect();
    this.observer = null;
    document.removeEventListener("input", this.inputListener, true);
    this.clearMarked();
  }
}

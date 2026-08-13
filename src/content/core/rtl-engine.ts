import type { SiteAdapter } from "../sites/types";
import { allTargetSelectors } from "../sites/types";

const ATTR = "data-ai-chat-rtl";
const SKIP_SELECTOR =
  "pre, code, .code-block, .hljs, .katex, mjx-container, .math, [class*='CodeBlock'], nav, aside, header";

export class RtlEngine {
  private adapter: SiteAdapter;
  private observer: MutationObserver | null = null;
  private enabled = false;

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
    } else {
      this.clearMarked();
    }
  }

  private markRtl(el: Element) {
    if (el.closest(SKIP_SELECTOR)) return;
    // Avoid flipping page chrome if a selector accidentally matches
    if (el.closest("nav, aside, [data-testid='sidebar'], #stage-slideover-sidebar")) {
      return;
    }
    el.setAttribute("dir", "auto");
    el.setAttribute("data-ai-chat-rtl-node", "1");
    const htmlEl = el as HTMLElement;
    if (!htmlEl.style.unicodeBidi) {
      htmlEl.style.unicodeBidi = "plaintext";
    }
  }

  private clearMarked() {
    document
      .querySelectorAll("[data-ai-chat-rtl-node]")
      .forEach((el) => {
        el.removeAttribute("dir");
        el.removeAttribute("data-ai-chat-rtl-node");
        (el as HTMLElement).style.removeProperty("unicode-bidi");
      });
  }

  private applyToNode(node: Node) {
    if (!(node instanceof Element)) return;

    const selector = allTargetSelectors(this.adapter);
    if (node.matches?.(selector)) {
      this.markRtl(node);
    }
    node.querySelectorAll?.(selector).forEach((el) => this.markRtl(el));
  }

  private applyToExisting() {
    if (document.body) this.applyToNode(document.body);
  }

  private startObserver() {
    if (this.observer) return;
    this.observer = new MutationObserver((mutations) => {
      if (!this.enabled) return;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          this.applyToNode(node);
        }
      }
    });
    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  destroy() {
    this.observer?.disconnect();
    this.observer = null;
  }
}

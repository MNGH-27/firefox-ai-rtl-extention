import type { SiteAdapter } from "./types";

export const claudeAdapter: SiteAdapter = {
  id: "claude",
  hosts: ["claude.ai"],
  messageSelectors: [
    "[data-testid='user-message']",
    "[data-testid='assistant-message']",
    ".font-claude-response",
    ".font-user-message",
  ],
  inputSelectors: [
    "fieldset div[contenteditable='true']",
    "[data-testid='chat-input'] .ProseMirror",
    "div[aria-label='Write your prompt to Claude']",
  ],
};

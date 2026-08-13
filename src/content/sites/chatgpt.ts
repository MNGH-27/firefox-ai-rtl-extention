import type { SiteAdapter } from "./types";

export const chatgptAdapter: SiteAdapter = {
  id: "chatgpt",
  hosts: ["chatgpt.com", "chat.openai.com"],
  messageSelectors: [
    "[data-message-author-role] .markdown",
    "[data-message-author-role] .whitespace-pre-wrap",
    "[data-message-author-role]",
  ],
  inputSelectors: [
    "#prompt-textarea",
    "div#prompt-textarea",
    "form [contenteditable='true']#prompt-textarea",
    "form .ProseMirror",
  ],
};

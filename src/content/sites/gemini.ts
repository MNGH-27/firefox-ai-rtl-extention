import type { SiteAdapter } from "./types";

export const geminiAdapter: SiteAdapter = {
  id: "gemini",
  hosts: ["gemini.google.com"],
  messageSelectors: [
    ".model-response-text",
    ".response-content",
    "message-content .markdown",
    ".query-text",
    ".user-query-bubble-with-background",
    ".user-query .query-text",
    "[data-message-author-role] .markdown",
  ],
  inputSelectors: [
    "rich-textarea .ql-editor",
    ".text-input-field .ql-editor",
    ".input-area .ql-editor",
  ],
};

# AI Chat RTL

## Download

Grab `ai-chat-rtl.xpi` from [Releases](https://github.com/MNGH-27/firefox-ai-rtl-extention/releases/latest), or use this direct link:

[Download ai-chat-rtl.xpi](https://github.com/MNGH-27/firefox-ai-rtl-extention/releases/latest/download/ai-chat-rtl.xpi)

Firefox usually asks to install it right away — hit **Add** and you're done.

If it doesn't install automatically:

1. Open `about:addons`
2. Click the gear ⚙️
3. **Install Add-on From File…**
4. Pick the `xpi` file

## What it does

A small Firefox extension that automatically fixes text direction in AI chats.

It checks each chat message and the prompt input as you type:

- Text containing Persian or Arabic characters is displayed RTL and aligned to the right.
- English-only text is left untouched and keeps the website's original layout.
- Mixed Persian/English text is displayed RTL for easier reading.
- Persian and Arabic text uses the bundled Vazirmatn font for better readability.
- Code blocks and math always stay LTR.

Only the chat area is affected. The sidebar and the rest of the website UI stay as they are.

Works with:

- [Gemini](https://gemini.google.com)
- [ChatGPT](https://chatgpt.com)
- [Claude](https://claude.ai)

You can turn RTL on/off per site from the toolbar icon.

## About the project

Personal repo. The goal is to make Persian and Arabic AI chats easier to read without changing English conversations or the rest of the website. If something breaks or a site stops working, open an Issue.

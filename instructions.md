Create a new private VS Code extension by forking this repository:

https://github.com/iAkhadjon/i2max-markdown-preview

Goal:

- Produce a company-safe local markdown preview extension for internal use only.
- Keep only the core markdown preview experience with a single command: **Open Preview to the Side**.
- Remove or disable risky features that are not needed.
- Rename the extension so it does not conflict with the upstream extension.

Current state (completed):

1. Extension renamed everywhere: `i2max-markdown-preview`
2. Upstream branding removed; README, URLs, publisher all updated
3. Security hardening applied (see SECURITY_REVIEW.md)
4. Only one user-facing command remains: `i2max-markdown-preview.openPreviewToTheSide` (Cmd+K V)
5. All other commands removed: `openPreview`, `toggleScrollSync`, `toggleLiveUpdate`, `toggleBreakOnSingleNewLine`, `syncPreview`, `insertNewSlide`, `insertTable`, `insertPagebreak`, `createTOC`, `customizeCss`, `customizeCssInWorkspace`, `openConfigScript`, `openConfigScriptInWorkspace`, `extendParser`, `extendParserInWorkspace`, `customizePreviewHtmlHead`, `customizePreviewHtmlHeadInWorkspace`, `openImageHelper`, `runAllCodeChunks`, `runCodeChunk`, `showUploadedImages`
6. Internal `_crossnote.*` commands preserved (required for webview communication)
7. Web extension mode disabled (`"browser"` entry removed)
8. Code chunk execution disabled by default
9. No external CDN/server calls by default
10. `.vsix` package builds and installs successfully

Constraints:

- Internal/private use only
- Do not publish to the Marketplace
- Do not use the original publisher name
- Preserve required open-source license notices
- Prefer secure defaults over feature completeness

# Changes — i2max Markdown Preview

Extension: `i2max-markdown-preview` v0.8.20  
Based on: `shd101wyy/vscode-markdown-preview-enhanced` v0.8.20  
Date: 2026-03-16

---

## Rename Map

| Category | Old value | New value |
|---|---|---|
| Extension `name` | `markdown-preview-enhanced` | `i2max-markdown-preview` |
| `displayName` | `Markdown Preview Enhanced` | `i2max Markdown Preview` |
| `publisher` | `shd101wyy` | `i2rd-internal` |
| Command IDs | `markdown-preview-enhanced.<cmd>` | `i2max-markdown-preview.<cmd>` |
| Configuration keys | `markdown-preview-enhanced.<key>` | `i2max-markdown-preview.<key>` |
| Config namespace in `config.ts` | `markdown-preview-enhanced` | `i2max-markdown-preview` |
| `repository` URL | `https://github.com/shd101wyy/vscode-markdown-preview-enhanced` | `https://internal.example.com/i2max-markdown-preview` |
| `bugs` URL | `https://github.com/shd101wyy/vscode-markdown-preview-enhanced/issues` | `https://internal.example.com/i2max-markdown-preview/issues` |
| NLS keys | `markdown-preview-enhanced.*` | `i2max-markdown-preview.*` |
| NLS display strings | `"Markdown Preview Enhanced"` | `"i2max Markdown Preview"` |

---

## Security Defaults Changed

| Setting | Old default | New default | Reason |
|---|---|---|---|
| `enableScriptExecution` | `false` (upstream lib) | `false` (explicit, hardcoded) | Prevent code chunk execution in untrusted documents |
| `plantumlServer` | `""` (auto-assigned to kroki.io in web mode) | `""` (no auto external server) | Prevent confidential diagram data from leaving the machine |
| `krokiServer` | upstream default | `""` | Same as above |
| `mathjaxV3ScriptSrc` | `https://cdn.jsdelivr.net/npm/mathjax@3/...` | `""` (use bundled) | No CDN calls for math rendering |
| `jsdelivrCdnHost` | upstream default | `""` | Use local bundled assets |
| `HTML5EmbedIsAllowedHttp` | `true` | `false` | Block loading of non-HTTPS embedded resources |

---

## Branding Removed

- `README.md`: replaced all "Markdown Preview Enhanced" branding with "i2max Markdown Preview"
- `package.nls.json`, `package.nls.zh.json`: all display strings updated
- Repository URL and bugs URL replaced with internal placeholder (`https://internal.example.com/...`)
- `.github/FUNDING.yml` is included in the repo but not published (internal use only)

## License and Attribution Preserved

- `LICENSE.md` retained in full (NCSA license)
- `CHANGELOG.md` retained from upstream (renamed changelog.md)
- Original contributor names preserved in `package.json` `contributors` field

---

## Features Kept

- Local Markdown preview (markdown-it renderer)
- Scroll sync, live update, TOC generation
- Mermaid diagrams (local rendering via bundled assets)
- KaTeX math rendering (local, bundled)
- Local CSS/theme customization (`customizeCss`, `customizeCssInWorkspace`)
- WikiLink syntax
- Code block highlighting
- HTML5 Embed (HTTP disabled by default)

---

## Features Disabled by Default (require explicit opt-in)

| Feature | Setting to enable |
|---|---|
| Code chunk / script execution | `i2max-markdown-preview.enableScriptExecution: true` |
| Pandoc-based rendering | `i2max-markdown-preview.usePandocParser: true` |
| External PlantUML server | `i2max-markdown-preview.plantumlServer: "https://..."` |
| External Kroki server | `i2max-markdown-preview.krokiServer: "https://..."` |
| MathJax CDN (instead of local) | `i2max-markdown-preview.mathjaxV3ScriptSrc: "https://..."` |
| HTTP embedded resources | `i2max-markdown-preview.HTML5EmbedIsAllowedHttp: true` |

---

## Additional Changes (second pass)

| Item | Change |
|---|---|
| `src/extension-common.ts` | Removed: `openImageHelper`, `cacheCodeChunkResult`, `runCodeChunk`, `runAllCodeChunks`, `runAllCodeChunksCommand`, `runCodeChunkCommand`, `setImageUploader` functions and all their command registrations |
| `src/extension-common.ts` | Removed import of `pasteImageFile`, `uploadImageFile` from `image-helper` |
| `src/extension.ts` | Removed `showUploadedImages` function and `i2max-markdown-preview.showUploadedImages` + `_crossnote.showUploadedImageHistory` registrations |
| `package.json` commands | Removed: `openImageHelper`, `runAllCodeChunks`, `runCodeChunk`, `showUploadedImages` |
| `package.json` settings | Removed: `imageUploader`, `imageFolderPath`, `qiniuAccessKey`, `qiniuSecretKey`, `qiniuBucket`, `qiniuDomain` |
| `package.json` | Removed `"browser"` entry — web extension mode disabled |
| `package.json` | Removed `atom://` from `protocolsWhiteList` default |
| `package.json` | Added `capabilities.untrustedWorkspaces` — `enableScriptExecution` blocked in untrusted workspaces |
| `build.js` | Added `proxy-agent` to esbuild `external` array |
| `package-lock.json` | Switched from `yarn.lock` to `package-lock.json`; `npm audit fix` applied |

---

## Additional Changes (third pass — vulnerability remediation)

| Item | Change |
|---|---|
| `build.js` | Added `puppeteer-core` and `request` to esbuild `external` array — removes vulnerable library code from the bundle. Bundle size reduced from 8.6MB to 6.4MB. |
| `package.json` | Added `overrides` section: `yauzl` forced to `>=3.2.1` (fixes off-by-one error CVE); `markdown-it-html5-embed > markdown-it` attempted override to `>=14` (incompatible with plugin API, remains at 8.4.2). |
| Production vulns | Reduced from 11 to 5 (and the remaining 5 are effectively neutralized since `request` library is externalized and not bundled). |
| DOMPurify | Verified: main DOMPurify 3.3.3 (latest, safe). Monaco's internal 3.0.5 is not used for user content rendering. |
| `.vsix` size | Reduced from 10.43MB to 9.48MB. |

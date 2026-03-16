# Build and Install — i2max Markdown Preview

Extension: `i2max-markdown-preview`  
Date: 2026-03-16

---

## Prerequisites

- **Node.js** ≥ 18 (tested with v24.6.0)
- **npm** ≥ 10 (bundled with Node.js)
- **VS Code** ≥ 1.90 (desktop)
- **vsce** (installed automatically via `npx`)

---

## 1. Get the source

```bash
git clone https://internal.example.com/i2max-markdown-preview.git
cd i2max-markdown-preview
```

Or copy the directory from your internal share.

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Build

```bash
npm run build
```

Outputs are written to `out/native/extension.js` (desktop) and `out/web/extension.js` (web).

---

## 4. Package into .vsix

```bash
npx @vscode/vsce package \
  --no-dependencies \
  --allow-missing-repository \
  --baseContentUrl https://internal.example.com/i2max-markdown-preview \
  --baseImagesUrl  https://internal.example.com/i2max-markdown-preview
```

This produces: `i2max-markdown-preview-0.8.20.vsix`

---

## 5. Install into VS Code

### a) Via the VS Code GUI

1. Open VS Code.
2. Open the Extensions side panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Click the **`...`** (three-dot) menu at the top right of the Extensions panel.
4. Select **Install from VSIX…**
5. Browse to `i2max-markdown-preview-0.8.20.vsix` and confirm.

### b) Via the command line

```bash
code --install-extension i2max-markdown-preview-0.8.20.vsix
```

### c) Via the VS Code CLI (Insiders)

```bash
code-insiders --install-extension i2max-markdown-preview-0.8.20.vsix
```

---

## 6. Distribute to the team

Share the `.vsix` file via your internal file server or version control. Team members install it via either method above (GUI or CLI). No access to the VS Code Marketplace is needed.

---

## 7. Uninstall

```bash
code --uninstall-extension i2rd-internal.i2max-markdown-preview
```

Or uninstall via the Extensions panel in VS Code.

---

## Rebuild after source changes

```bash
npm run build && npx @vscode/vsce package \
  --no-dependencies \
  --allow-missing-repository \
  --baseContentUrl https://internal.example.com/i2max-markdown-preview \
  --baseImagesUrl  https://internal.example.com/i2max-markdown-preview
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `husky - git command not found` | Expected — the repo isn't a git repo. Safe to ignore. |
| `engine "vscode" appears to be invalid` | Expected warning from npm. Does not affect the build. |
| `DeprecationWarning: fs.Stats constructor is deprecated` | Expected from older build tool internals. Does not affect output. |
| `code: command not found` | Add VS Code's `bin` directory to your PATH, or launch VS Code and run **Shell Command: Install 'code' command in PATH** from the Command Palette. |

---

## Security Notes

- Do **not** enable `i2max-markdown-preview.enableScriptExecution` in workspace settings unless all opened documents are fully trusted.
- Do **not** configure external PlantUML/Kroki servers if documents contain confidential content.
- See [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the full audit.

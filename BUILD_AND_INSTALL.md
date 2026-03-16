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

## 3. Package the Extension

```bash
npm run package
```

This runs the production webpack build and creates a `.vsix` file (e.g., `i2max-markdown-preview-1.0.0.vsix`).

---

## 4. Install into VS Code via Terminal

```bash
code --install-extension i2max-markdown-preview-1.0.0.vsix
```

---

## 5. Distribute to the team

Share the `.vsix` file via your internal file server or version control. Team members install it via either method above (GUI or CLI). No access to the VS Code Marketplace is needed.

---

## 6. Uninstall

```bash
code --uninstall-extension i2rd-internal.i2max-markdown-preview
```

Or uninstall via the Extensions panel in VS Code.

---

## Rebuild after source changes

```bash
npm run package
```

---

## Troubleshooting

| Problem                                                  | Fix                                                                                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `husky - git command not found`                          | Expected — the repo isn't a git repo. Safe to ignore.                                                                                             |
| `engine "vscode" appears to be invalid`                  | Expected warning from npm. Does not affect the build.                                                                                             |
| `DeprecationWarning: fs.Stats constructor is deprecated` | Expected from older build tool internals. Does not affect output.                                                                                 |
| `code: command not found`                                | Add VS Code's `bin` directory to your PATH, or launch VS Code and run **Shell Command: Install 'code' command in PATH** from the Command Palette. |

---

## Usage

The extension provides a single command:

| Shortcut                                                                            | Command                                              |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| <kbd>Cmd+Shift+Option+M</kbd> (macOS) / <kbd>Ctrl+Shift+Alt+M</kbd> (Windows/Linux) | **i2max Markdown Preview: Open Preview to the Side** |

You can also right-click in a Markdown file → **i2max Markdown Preview: Open Preview to the Side**, or use the icon in the editor title bar.

---

## Security Notes

- Do **not** enable `i2max-markdown-preview.enableScriptExecution` in workspace settings unless all opened documents are fully trusted.
- Do **not** configure external PlantUML/Kroki servers if documents contain confidential content.
- See [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the full audit.

<h1 align="center"> i2max Markdown Preview </h1>

A secure, company-internal VS Code extension for rich Markdown preview.  
Forked from [Markdown Preview Enhanced](https://github.com/shd101wyy/vscode-markdown-preview-enhanced) and hardened for internal use.

---

## Usage

Open any `.md` file, then:

| Shortcut                                                         | Action                   |
| ---------------------------------------------------------------- | ------------------------ |
| <kbd>Cmd+K V</kbd> (macOS) / <kbd>Ctrl+K V</kbd> (Windows/Linux) | Open Preview to the Side |

Or right-click in the editor → **i2max Markdown Preview: Open Preview to the Side**.

---

## Features

- Rich Markdown preview with scroll sync and live update
- Mermaid diagrams (local rendering, bundled)
- KaTeX math rendering (local, bundled)
- Code block syntax highlighting
- WikiLink support
- Preview themes (GitHub, One Dark, Solarized, etc.)
- Custom editor mode (open `.md` files directly in preview)

---

## Security

- Code chunk execution disabled by default
- No external CDN calls (all assets bundled locally)
- No image upload features
- No telemetry
- See [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the full audit

---

## Build & Install

See [BUILD_AND_INSTALL.md](BUILD_AND_INSTALL.md) for instructions.

---

## License

[University of Illinois/NCSA Open Source License](LICENSE.md)

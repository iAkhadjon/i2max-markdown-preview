Clone VS Code markdown preview extension into a new internal-only company extension.
https://github.com/iAkhadjon/i2max-markdown-preview

Tasks:
- Rename extension name, publisher, commands, settings, and branding so it is clearly a new internal extension.
- Preserve license notices.
- Audit for XSS, unsafe webview content, unsafe URI handling, path traversal, shell execution, child_process use, and remote network calls.
- Disable risky features by default, especially code execution, remote upload, external renderers, and CDN-dependent features.
- Keep only safe local markdown preview features.
- Build a working .vsix and write install instructions for local/team use.
- Create SECURITY_REVIEW.md, CHANGES.md, and BUILD_AND_INSTALL.md.
- At the end, summarize what was changed and what risks remain.
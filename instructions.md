Create a new private VS Code extension by forking this repository:

https://github.com/iAkhadjon/i2max-markdown-preview

Goal:
- Produce a company-safe local markdown preview extension for internal use only.
- Keep the core markdown preview experience.
- Remove or disable risky features that are not needed.
- Rename the extension so it does not conflict with the upstream extension.

Required changes:
1. Rename the extension everywhere: i2max-markdown-preview
   - package.json name
   - displayName 
   - publisher
   - command IDs
   - configuration keys
   - output channel names
   - any storage keys or context keys
2. Remove upstream branding:
   - replace repository URL
   - replace bugs URL
   - replace README branding
   - keep original license and attribution notices required by the license
3. Security hardening:
   - audit all webviews for unsafe HTML injection
   - ensure scripts in webviews use CSP and nonces where possible
   - block or sanitize unsafe URI schemes
   - review markdown rendering for XSS risks
   - review file path handling for path traversal
   - review command execution, child_process usage, shell execution, and external tool invocation
   - disable by default any features that execute local commands or code chunks
   - disable by default integrations that call external network services
   - make CDN and remote rendering optional, off by default
   - remove telemetry if present
4. Feature scope:
   - keep local markdown preview
   - keep local CSS/theme customization only if it is safe
   - keep mermaid only if it works fully locally
   - disable or remove code chunk execution, remote image upload, pandoc shell-outs, and any cloud-backed features unless clearly needed
5. Build and packaging:
   - make the extension build successfully with current supported VS Code extension tooling
   - generate a .vsix package
   - provide commands to install locally in VS Code
6. Deliverables:
   - a SECURITY_REVIEW.md listing findings, risks, and what was changed
   - a CHANGES.md summarizing all renames and removed features
   - a BUILD_AND_INSTALL.md with exact commands
   - a short list of remaining risks and manual checks

Constraints:
- Internal/private use only
- Do not publish to the Marketplace
- Do not use the original publisher name
- Preserve required open-source license notices
- Prefer secure defaults over feature completeness

First, inspect the repository and produce:
A. a plan,
B. a list of risky modules/files,
C. a proposed rename map,
D. then make the changes.
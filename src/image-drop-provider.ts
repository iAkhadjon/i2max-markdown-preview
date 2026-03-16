import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp'];
const IMAGE_FOLDER = 'MDImages';

export class MarkdownImageDropProvider implements vscode.DocumentDropEditProvider {
  async provideDocumentDropEdits(
    document: vscode.TextDocument,
    _position: vscode.Position,
    dataTransfer: vscode.DataTransfer,
    token: vscode.CancellationToken,
  ): Promise<vscode.DocumentDropEdit | undefined> {
    const uriListItem = dataTransfer.get('text/uri-list');
    if (!uriListItem) {
      return undefined;
    }

    const uriListText = await uriListItem.asString();
    if (token.isCancellationRequested) {
      return undefined;
    }

    const uris = uriListText
      .split('\r\n')
      .filter(line => line.length > 0 && !line.startsWith('#'))
      .map(line => {
        try {
          return vscode.Uri.parse(line.trim());
        } catch {
          return undefined;
        }
      })
      .filter((uri): uri is vscode.Uri => uri !== undefined);

    if (uris.length === 0) {
      return undefined;
    }

    const imageUris = uris.filter(uri => {
      const ext = path.extname(uri.fsPath).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext);
    });

    if (imageUris.length === 0) {
      return undefined;
    }

    const docDir = path.dirname(document.uri.fsPath);
    const imageDir = path.join(docDir, IMAGE_FOLDER);

    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    const snippetParts: string[] = [];

    for (const uri of imageUris) {
      if (token.isCancellationRequested) {
        return undefined;
      }

      const originalName = path.basename(uri.fsPath);
      let targetName = originalName;
      let targetPath = path.join(imageDir, targetName);

      // Avoid overwriting existing files by appending a number
      let counter = 1;
      while (fs.existsSync(targetPath)) {
        const ext = path.extname(originalName);
        const base = path.basename(originalName, ext);
        targetName = `${base}-${counter}${ext}`;
        targetPath = path.join(imageDir, targetName);
        counter++;
      }

      // Copy image to readmeimages folder
      fs.copyFileSync(uri.fsPath, targetPath);

      const encodedPath = `${IMAGE_FOLDER}/${encodeURIComponent(targetName)}`;
      const altText = path.basename(targetName, path.extname(targetName));
      snippetParts.push(`![${altText}](${encodedPath})`);
    }

    const snippet = new vscode.SnippetString(snippetParts.join('\n'));
    const edit = new vscode.DocumentDropEdit(snippet);
    return edit;
  }
}

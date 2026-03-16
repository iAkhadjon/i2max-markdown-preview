// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as fs from 'fs';
import * as vscode from 'vscode';
import { initExtensionCommon } from './extension-common';
import { MarkdownImageDropProvider } from './image-drop-provider';
import { PreviewProvider } from './preview-provider';
import { globalConfigPath } from './utils';

// this method is called when your extension openTextDocuments activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  try {
    if (!fs.existsSync(globalConfigPath)) {
      fs.mkdirSync(globalConfigPath, { recursive: true });
    }
    // Watch the file changes in global config directory.
    fs.watch(globalConfigPath, async (eventType, fileName) => {
      if (
        eventType === 'change' &&
        ['style.less', 'config.js', 'parser.js', 'head.html'].includes(fileName ?? '')
      ) {
        PreviewProvider.notebooksManager?.updateAllNotebooksConfig();
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    // Init the extension-common module
    await initExtensionCommon(context);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('i2max-markdown-preview activation failed:', msg);
    vscode.window.showErrorMessage(`i2max Markdown Preview failed to activate: ${msg}`);
    return;
  }

  // Register drag-and-drop image provider for markdown files
  const markdownSelector: vscode.DocumentSelector = { language: 'markdown' };
  context.subscriptions.push(
    vscode.languages.registerDocumentDropEditProvider(
      markdownSelector,
      new MarkdownImageDropProvider(),
    ),
  );
}

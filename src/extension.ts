import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "play-with-text.kebab-case-v2",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;

        const selectedText = editor.document.getText(selection);

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, toKabobCase(selectedText));
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

function toKabobCase(input: string): string {
  return input
    .replace(/[\s_]+/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

export function deactivate() {}

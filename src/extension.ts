import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "play-with-text.kebab-case-v2",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selections = editor.selections;

        editor.edit((editBuilder) => {
          selections.forEach((selection) => {
            const selectedText = editor.document.getText(selection);
            editBuilder.replace(selection, toKabobCase(selectedText));
          });
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

function toKabobCase(input: string): string {
  return input
    .replace(/\s*(['"])\s*/g, "$1")
    .replace(/[\s_]+/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

export function deactivate() {}

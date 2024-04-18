import { type Monaco } from "@monaco-editor/react";

export default function(monaco: Monaco) {
  monaco.editor.defineTheme('transparent', {
    base: 'vs-dark',
    colors: {
      'editor.background': '#ffffff00',
      'editor.foreground': '#ffeae7',
      "editor.selectionBackground": "#c52f1b",
      "editor.lineHighlightBackground": "#ffffff11",
      "editorCursor.foreground": "#ffeae7",
      "editor.selectionHighlightBorder": "#c52f1b",
    },
    inherit: false,
    rules: [
      { token:'string', foreground: '#a3ffa7' },
      { token:'keyword', foreground: '#ffc36e', fontStyle: 'bold' },
      { token:'comment', foreground: '#999999' },
      { token: 'flowchartnode', foreground: '#a2ffff' },
    ]
  });
}
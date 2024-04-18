import { type Monaco } from "@monaco-editor/react";
import { KEYWORDS_LABELS, LANGUAGES, LANGUAGES_KEYWORDS, LANGUAGES_TOKENIZERS } from "../constants/languages";

export default function(monaco: Monaco) {
  const languages = Object.values(LANGUAGES);

  for (const lang of languages) {
    monaco.languages.register({id: lang,});
    console.log({lang, keys: LANGUAGES_KEYWORDS[lang], tokens: LANGUAGES_TOKENIZERS[lang], labels: KEYWORDS_LABELS[lang]});

    const keywordsRule = [
      ...LANGUAGES_KEYWORDS[lang]?.suggested ?? [],
      ...LANGUAGES_KEYWORDS[lang]?.nonSuggested ?? [],
    ].join('|')
    monaco.languages.setMonarchTokensProvider(
      lang,
      {
        tokenizer: {
          root: [
              [new RegExp(keywordsRule), "keyword"],
              [/".*"/, "string"],
              [/%%.*/, "comment"],
              ...LANGUAGES_TOKENIZERS[lang] ?? []
          ],
        },
      }
    )
    monaco.languages.registerCompletionItemProvider(
      lang,
      {
        // @ts-expect-error aasa
        provideCompletionItems: function () {
          const suggestions = LANGUAGES_KEYWORDS[lang].suggested
          .map((keyword: string) => ({
                // @ts-expect-error aasa
                label: KEYWORDS_LABELS[lang] && KEYWORDS_LABELS[lang][keyword] ? KEYWORDS_LABELS[lang][keyword] : keyword,
                kind: monaco.languages.CompletionItemKind.Keyword,
                // @ts-expect-error aasa
                insertText: KEYWORDS_LABELS[lang] && KEYWORDS_LABELS[lang][keyword] ? KEYWORDS_LABELS[lang][keyword] : keyword,
                // detail: KEYWORDS_DETAILS[keyword] ?? '',
                // documentation: KEYWORDS_DETAILS[keyword] ?? ''
              })
            )
          return {suggestions}
        },
      }
    );

  }
  //   LANGUAGES.CLASS_DIAGRAM,
  //   {
  //     // @ts-expect-error aasa
  //     provideCodeLenses: function () {
  //       return {
  //         lenses: [
  //           {
  //             range: {startLineNumber: 1, startColumn: 1, endLineNumber: 2, endColumn: 1 },
  //             id: "First Line",
  //             command: {
  //               id: null,
  //               title: LANGUAGES_VERBOSE[LANGUAGES.CLASS_DIAGRAM],
  //             },
  //           },
  //         ],
  //         dispose: () => {},
  //       };
  //     },
  //     resolveCodeLens: function (_model, codeLens) {
  //       return codeLens;
  //     },
  //   }
  // );
}